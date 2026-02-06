"use client";

import { useEffect, useState } from "react";

// GDPR-violating code that a user might write -- hardcoded secrets, PII, no consent
const codeLines = [
  { text: `import { db } from "../lib/database";`, tokens: [
    { text: "import", color: "#c586c0" }, { text: " { db } ", color: "#9cdcfe" },
    { text: "from", color: "#c586c0" }, { text: ' "../lib/database"', color: "#ce9178" },
    { text: ";", color: "#d4d4d4" },
  ]},
  { text: `import { sendEmail } from "../lib/mailer";`, tokens: [
    { text: "import", color: "#c586c0" }, { text: " { sendEmail } ", color: "#9cdcfe" },
    { text: "from", color: "#c586c0" }, { text: ' "../lib/mailer"', color: "#ce9178" },
    { text: ";", color: "#d4d4d4" },
  ]},
  { text: "", tokens: [] },
  { text: `// Database credentials`, tokens: [
    { text: "// Database credentials", color: "#6a9955" },
  ]},
  { text: `const DB_HOST = "prod-db.eu-west-1.rds.amazonaws.com";`, tokens: [
    { text: "const", color: "#569cd6" }, { text: " DB_HOST", color: "#4fc1ff" },
    { text: " = ", color: "#d4d4d4" },
    { text: '"prod-db.eu-west-1.rds.amazonaws.com"', color: "#ce9178" },
    { text: ";", color: "#d4d4d4" },
  ]},
  { text: `const DB_PASSWORD = "s3cr3t_pr0d_p@ssw0rd!";`, tokens: [
    { text: "const", color: "#569cd6" }, { text: " DB_PASSWORD", color: "#4fc1ff" },
    { text: " = ", color: "#d4d4d4" },
    { text: '"s3cr3t_pr0d_p@ssw0rd!"', color: "#ce9178" },
    { text: ";", color: "#d4d4d4" },
  ]},
  { text: `const API_SECRET = "sk_live_a1b2c3d4e5f6g7h8i9j0";`, tokens: [
    { text: "const", color: "#569cd6" }, { text: " API_SECRET", color: "#4fc1ff" },
    { text: " = ", color: "#d4d4d4" },
    { text: '"sk_live_a1b2c3d4e5f6g7h8i9j0"', color: "#ce9178" },
    { text: ";", color: "#d4d4d4" },
  ]},
  { text: "", tokens: [] },
  { text: `interface UserRecord {`, tokens: [
    { text: "interface", color: "#569cd6" }, { text: " UserRecord", color: "#4ec9b0" },
    { text: " {", color: "#d4d4d4" },
  ]},
  { text: `  id: string;`, tokens: [
    { text: "  id", color: "#9cdcfe" }, { text: ": ", color: "#d4d4d4" },
    { text: "string", color: "#4ec9b0" }, { text: ";", color: "#d4d4d4" },
  ]},
  { text: `  fullName: string;`, tokens: [
    { text: "  fullName", color: "#9cdcfe" }, { text: ": ", color: "#d4d4d4" },
    { text: "string", color: "#4ec9b0" }, { text: ";", color: "#d4d4d4" },
  ]},
  { text: `  ssn: string;`, tokens: [
    { text: "  ssn", color: "#9cdcfe" }, { text: ": ", color: "#d4d4d4" },
    { text: "string", color: "#4ec9b0" }, { text: ";", color: "#d4d4d4" },
  ]},
  { text: `  email: string;`, tokens: [
    { text: "  email", color: "#9cdcfe" }, { text: ": ", color: "#d4d4d4" },
    { text: "string", color: "#4ec9b0" }, { text: ";", color: "#d4d4d4" },
  ]},
  { text: `  creditCard: string;`, tokens: [
    { text: "  creditCard", color: "#9cdcfe" }, { text: ": ", color: "#d4d4d4" },
    { text: "string", color: "#4ec9b0" }, { text: ";", color: "#d4d4d4" },
  ]},
  { text: `}`, tokens: [{ text: "}", color: "#d4d4d4" }] },
  { text: "", tokens: [] },
  { text: `export async function getUserData(userId: string) {`, tokens: [
    { text: "export", color: "#c586c0" }, { text: " async", color: "#569cd6" },
    { text: " function", color: "#569cd6" }, { text: " getUserData", color: "#dcdcaa" },
    { text: "(", color: "#d4d4d4" }, { text: "userId", color: "#9cdcfe" },
    { text: ": ", color: "#d4d4d4" }, { text: "string", color: "#4ec9b0" },
    { text: ") {", color: "#d4d4d4" },
  ]},
  { text: `  // Fetching all user data without field filtering`, tokens: [
    { text: "  // Fetching all user data without field filtering", color: "#6a9955" },
  ]},
  { text: `  const user = await db.query(`, tokens: [
    { text: "  const", color: "#569cd6" }, { text: " user", color: "#9cdcfe" },
    { text: " = ", color: "#d4d4d4" }, { text: "await", color: "#c586c0" },
    { text: " db", color: "#9cdcfe" }, { text: ".query", color: "#dcdcaa" },
    { text: "(", color: "#d4d4d4" },
  ]},
  { text: `    \`SELECT * FROM users WHERE id = '\${userId}'\``, tokens: [
    { text: "    `SELECT * FROM users WHERE id = '${", color: "#ce9178" },
    { text: "userId", color: "#9cdcfe" },
    { text: "}'`", color: "#ce9178" },
  ]},
  { text: `  );`, tokens: [
    { text: "  );", color: "#d4d4d4" },
  ]},
  { text: "", tokens: [] },
  { text: `  // Log PII to console for debugging`, tokens: [
    { text: "  // Log PII to console for debugging", color: "#6a9955" },
  ]},
  { text: `  console.log("User SSN:", user.ssn);`, tokens: [
    { text: "  console", color: "#9cdcfe" }, { text: ".log", color: "#dcdcaa" },
    { text: "(", color: "#d4d4d4" }, { text: '"User SSN:"', color: "#ce9178" },
    { text: ", user.ssn", color: "#9cdcfe" },
    { text: ");", color: "#d4d4d4" },
  ]},
  { text: `  console.log("Credit Card:", user.creditCard);`, tokens: [
    { text: "  console", color: "#9cdcfe" }, { text: ".log", color: "#dcdcaa" },
    { text: "(", color: "#d4d4d4" }, { text: '"Credit Card:"', color: "#ce9178" },
    { text: ", user.creditCard", color: "#9cdcfe" },
    { text: ");", color: "#d4d4d4" },
  ]},
  { text: "", tokens: [] },
  { text: `  // Store data in localStorage without encryption`, tokens: [
    { text: "  // Store data in localStorage without encryption", color: "#6a9955" },
  ]},
  { text: `  localStorage.setItem("user_ssn", user.ssn);`, tokens: [
    { text: "  localStorage", color: "#9cdcfe" }, { text: ".setItem", color: "#dcdcaa" },
    { text: "(", color: "#d4d4d4" }, { text: '"user_ssn"', color: "#ce9178" },
    { text: ", user.ssn", color: "#9cdcfe" }, { text: ");", color: "#d4d4d4" },
  ]},
  { text: `  localStorage.setItem("user_cc", user.creditCard);`, tokens: [
    { text: "  localStorage", color: "#9cdcfe" }, { text: ".setItem", color: "#dcdcaa" },
    { text: "(", color: "#d4d4d4" }, { text: '"user_cc"', color: "#ce9178" },
    { text: ", user.creditCard", color: "#9cdcfe" }, { text: ");", color: "#d4d4d4" },
  ]},
  { text: "", tokens: [] },
  { text: `  // No consent check before sending marketing emails`, tokens: [
    { text: "  // No consent check before sending marketing emails", color: "#6a9955" },
  ]},
  { text: `  await sendEmail(user.email, "Special offer for you!");`, tokens: [
    { text: "  await", color: "#c586c0" }, { text: " sendEmail", color: "#dcdcaa" },
    { text: "(user.email, ", color: "#d4d4d4" },
    { text: '"Special offer for you!"', color: "#ce9178" },
    { text: ");", color: "#d4d4d4" },
  ]},
  { text: "", tokens: [] },
  { text: `  return user;`, tokens: [
    { text: "  return", color: "#c586c0" }, { text: " user;", color: "#9cdcfe" },
  ]},
  { text: `}`, tokens: [{ text: "}", color: "#d4d4d4" }] },
  { text: "", tokens: [] },
  { text: `export async function deleteUser(userId: string) {`, tokens: [
    { text: "export", color: "#c586c0" }, { text: " async", color: "#569cd6" },
    { text: " function", color: "#569cd6" }, { text: " deleteUser", color: "#dcdcaa" },
    { text: "(", color: "#d4d4d4" }, { text: "userId", color: "#9cdcfe" },
    { text: ": ", color: "#d4d4d4" }, { text: "string", color: "#4ec9b0" },
    { text: ") {", color: "#d4d4d4" },
  ]},
  { text: `  // No data retention policy - just soft deletes`, tokens: [
    { text: "  // No data retention policy - just soft deletes", color: "#6a9955" },
  ]},
  { text: `  await db.query(\`UPDATE users SET active=false WHERE id='\${userId}'\`);`, tokens: [
    { text: "  await", color: "#c586c0" }, { text: " db", color: "#9cdcfe" },
    { text: ".query", color: "#dcdcaa" },
    { text: "(`UPDATE users SET active=false WHERE id='${", color: "#ce9178" },
    { text: "userId", color: "#9cdcfe" }, { text: "}'`);", color: "#ce9178" },
  ]},
  { text: `  // User data remains in database indefinitely`, tokens: [
    { text: "  // User data remains in database indefinitely", color: "#6a9955" },
  ]},
  { text: `}`, tokens: [{ text: "}", color: "#d4d4d4" }] },
];

// Violation definitions: which lines are flagged and at what stage
interface Violation {
  line: number;
  severity: "critical" | "high" | "medium";
  delay: number; // seconds after mount to show
}

const violations: Violation[] = [
  { line: 5, severity: "critical", delay: 3 },   // DB_HOST hardcoded
  { line: 6, severity: "critical", delay: 3.5 },  // DB_PASSWORD hardcoded
  { line: 7, severity: "critical", delay: 4 },    // API_SECRET hardcoded
  { line: 12, severity: "high", delay: 6 },       // SSN field
  { line: 14, severity: "high", delay: 6.5 },     // creditCard field
  { line: 19, severity: "medium", delay: 8 },     // SELECT * (over-fetching PII)
  { line: 23, severity: "critical", delay: 9 },   // console.log SSN
  { line: 24, severity: "critical", delay: 9.5 },  // console.log CC
  { line: 27, severity: "high", delay: 11 },      // localStorage SSN
  { line: 28, severity: "high", delay: 11.5 },    // localStorage CC
  { line: 31, severity: "high", delay: 13 },      // no consent email
  { line: 37, severity: "medium", delay: 15 },    // no data retention
  { line: 38, severity: "medium", delay: 15.5 },  // soft delete only
];

export function CodeEditor() {
  const [activeViolations, setActiveViolations] = useState<Set<number>>(new Set());
  const [scanLine, setScanLine] = useState<number | null>(null);

  useEffect(() => {
    // Animate the scan line
    const scanInterval = setInterval(() => {
      setScanLine((prev) => {
        if (prev === null) return 1;
        if (prev >= codeLines.length) return 1;
        return prev + 1;
      });
    }, 400);

    // Reveal violations progressively
    const timers = violations.map((v) =>
      setTimeout(() => {
        setActiveViolations((prev) => new Set([...prev, v.line]));
      }, v.delay * 1000)
    );

    return () => {
      clearInterval(scanInterval);
      timers.forEach(clearTimeout);
    };
  }, []);

  const getSeverityColor = (line: number) => {
    const v = violations.find((viol) => viol.line === line);
    if (!v) return "";
    switch (v.severity) {
      case "critical": return "bg-[hsla(0,72%,51%,0.08)] border-l-2 border-l-[hsl(0,72%,51%)]";
      case "high": return "bg-[hsla(30,100%,50%,0.06)] border-l-2 border-l-[hsl(30,100%,50%)]";
      case "medium": return "bg-[hsla(45,100%,50%,0.05)] border-l-2 border-l-[hsl(45,100%,50%)]";
    }
  };

  const getGutterIcon = (line: number) => {
    const v = violations.find((viol) => viol.line === line);
    if (!v) return null;
    switch (v.severity) {
      case "critical": return <span className="w-3 h-3 rounded-full bg-[hsl(0,72%,51%)] flex items-center justify-center text-[7px] font-bold text-[hsl(0,0%,100%)]">!</span>;
      case "high": return <span className="w-3 h-3 rounded-full bg-[hsl(30,100%,50%)] flex items-center justify-center text-[7px] font-bold text-[hsl(220,14%,10%)]">!</span>;
      case "medium": return <span className="w-3 h-3 rounded-full bg-[hsl(45,100%,50%)] flex items-center justify-center text-[7px] font-bold text-[hsl(220,14%,10%)]">~</span>;
    }
  };

  const getUnderlineColor = (line: number) => {
    const v = violations.find((viol) => viol.line === line);
    if (!v) return "";
    switch (v.severity) {
      case "critical": return "decoration-[hsl(0,72%,51%)]";
      case "high": return "decoration-[hsl(30,100%,50%)]";
      case "medium": return "decoration-[hsl(45,100%,50%)]";
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-[hsl(220,14%,12%)] font-mono text-[13px] leading-5 relative">
      {/* Scan line overlay */}
      {scanLine !== null && scanLine <= codeLines.length && (
        <div
          className="absolute left-0 right-0 h-5 bg-[hsla(210,100%,56%,0.04)] pointer-events-none transition-all duration-300 z-10"
          style={{ top: `${(scanLine - 1) * 20}px` }}
        >
          <div className="absolute right-0 top-0 h-full w-1 bg-[hsla(210,100%,56%,0.3)]" />
        </div>
      )}

      <div className="min-w-max">
        {codeLines.map((line, i) => {
          const lineNum = i + 1;
          const isViolation = activeViolations.has(lineNum);
          const severityClass = isViolation ? getSeverityColor(lineNum) : "";
          const underlineClass = isViolation ? getUnderlineColor(lineNum) : "";

          return (
            <div
              key={lineNum}
              className={`flex items-center h-5 transition-colors duration-500 ${severityClass}`}
              style={isViolation ? { animation: "fadeInHighlight 0.6s ease-out" } : undefined}
            >
              {/* Line number gutter */}
              <div className="w-12 shrink-0 text-right pr-2 text-[hsl(220,10%,35%)] select-none text-xs flex items-center justify-end gap-1">
                {isViolation && getGutterIcon(lineNum)}
                <span>{lineNum}</span>
              </div>

              {/* Code content */}
              <div className={`pl-4 whitespace-pre ${isViolation ? `underline decoration-wavy decoration-1 ${underlineClass}` : ""}`}>
                {line.tokens.map((token, j) => (
                  <span key={`${lineNum}-${j}`} style={{ color: token.color }}>
                    {token.text}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
