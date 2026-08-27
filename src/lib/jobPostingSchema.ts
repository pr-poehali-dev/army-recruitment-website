interface VacancyLike {
  role: string;
  category: string;
  rank: string;
  pay: string;
  desc: string;
}

function extractSalary(pay: string): number | null {
  const digits = pay.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : null;
}

export function buildJobPostingSchema(vacancy: VacancyLike, url: string) {
  const salary = extractSalary(vacancy.pay);
  const datePosted = new Date();
  datePosted.setDate(datePosted.getDate() - 3);
  const validThrough = new Date();
  validThrough.setDate(validThrough.getDate() + 30);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: vacancy.role,
    description: `${vacancy.desc} Воинское звание: ${vacancy.rank}. Категория: ${vacancy.category}.`,
    identifier: {
      "@type": "PropertyValue",
      name: "Служба по контракту",
      value: vacancy.role,
    },
    datePosted: datePosted.toISOString().split("T")[0],
    validThrough: validThrough.toISOString().split("T")[0],
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Служба по контракту в тылу",
      sameAs: url,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "RU",
        addressLocality: "Россия",
      },
    },
    baseSalary: salary
      ? {
          "@type": "MonetaryAmount",
          currency: "RUB",
          value: {
            "@type": "QuantitativeValue",
            minValue: salary,
            unitText: "MONTH",
          },
        }
      : undefined,
    directApply: true,
  };
}

export function injectJsonLd(id: string, data: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function removeJsonLd(id: string) {
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
}
