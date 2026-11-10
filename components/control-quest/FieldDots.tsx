/**
 * The finale field, drawn as people. Every count comes from the page's own
 * facts: 15 finalists, five teams of three, the top three teams, and the
 * whole room for the audience round. Which three teams reached the buzzer
 * is not recorded on the page, so that stage names no team.
 */
export type FieldStage = "finalists" | "teams" | "case" | "buzzer" | "room";

const TEAMS = 5;
const PER_TEAM = 3;

export function FieldDots({ stage, teams }: { stage: FieldStage; teams: string[] }) {
  if (stage === "finalists") {
    return (
      <div className="cq-field cq-field--finalists" aria-hidden="true">
        {Array.from({ length: TEAMS * PER_TEAM }, (_, i) => (
          <span key={i} className="cq-dot" style={{ "--d": i } as React.CSSProperties} />
        ))}
      </div>
    );
  }

  const named = stage === "teams" || stage === "case";
  return (
    <div className={`cq-field cq-field--teams cq-field--${stage}`} aria-hidden="true">
      {stage === "room" && (
        <div className="cq-field-room">
          {Array.from({ length: 48 }, (_, i) => (
            <span key={i} className="cq-dot cq-dot--room" style={{ "--d": i } as React.CSSProperties} />
          ))}
        </div>
      )}
      {Array.from({ length: TEAMS }, (_, t) => (
        <div key={t} className="cq-team" data-out={stage === "buzzer" && t >= 3 ? "" : undefined}>
          <div className="cq-team-dots">
            {Array.from({ length: PER_TEAM }, (_, p) => (
              <span key={p} className="cq-dot" style={{ "--d": t * PER_TEAM + p } as React.CSSProperties} />
            ))}
          </div>
          {named && <span className="cq-team-name">{teams[t]}</span>}
        </div>
      ))}
    </div>
  );
}
