import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, ChevronDown, MapPin, Sparkles } from "lucide-react";

const roleOptions = [
  "Teacher",
  "School Leader",
  "IT Admin",
  "Special Education Specialist",
  "Multilingual / ELL Specialist",
  "Curriculum / Instructional Coach",
  "Staff",
  "Parent",
  "Other",
];

const gradeOptions = [
  "Pre-K",
  "Kindergarten",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "Other",
];

const subjectOptions = [
  "Mathematics",
  "English Language Arts",
  "World Languages",
  "Science",
  "Social Studies",
  "Career and Technical Education",
  "Computer Science",
  "Special Education",
  "Multi-language Learners",
  "Arts",
  "Physical Education",
  "Health Education",
  "Other",
];

const promptTypes = ["lesson plan", "exit ticket", "quiz", "discussion"];
const promptTopics = ["Newton's laws", "cell biology", "ratios", "poetry"];
const promptStyles = ["encourage critical thinking", "check retention", "spark discussion"];

const sampleCards = [
  { title: "Math Linear Algebra", meta: "Grade 8 - 40 Students - 2 Teachers" },
  { title: "Geology AP", meta: "Grade 8 - 40 Students - 2 Teachers" },
  { title: "Earth Science Lab", meta: "Grade 8 - 40 Students - 2 Teachers" },
];

const stepConfig = [
  { id: "schoolName", cta: "Continue to grade selection" },
  { id: "schoolZip", cta: "Continue to grade selection" },
  { id: "role", cta: "Continue to grade selection" },
  { id: "grades", cta: "Continue to grade selection" },
  { id: "subjects", cta: "Continue to grade selection" },
  { id: "intro", cta: "Show me examples!", hideBack: true },
  { id: "prompt", cta: "Generate" },
  { id: "samples", cta: "Generate" },
  { id: "complete", cta: "You're all set" },
];

const fadeVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.24, ease: "easeIn" } },
};

function Chip({ label, active, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.18 }}
      className={`chip ${active ? "chip-active" : ""}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </motion.button>
  );
}

function ClassroomBackground() {
  return (
    <>
      <div className="bg-wave" />
      <div className="bg-left" />
      <div className="bg-right" />
      <div className="bg-desk-left" />
      <div className="bg-desk-right" />
    </>
  );
}

function BrandLogo() {
  return (
    <div className="brand">
      <div className="brand-mark">
        <span className="mark-a" />
        <span className="mark-b" />
      </div>
      <span>colleague.ai</span>
    </div>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [schoolName, setSchoolName] = useState("");
  const [zip, setZip] = useState("");
  const [roles, setRoles] = useState([]);
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [promptType, setPromptType] = useState(promptTypes[0]);
  const [promptGrade] = useState("8th grade");
  const [promptTopic, setPromptTopic] = useState(promptTopics[0]);
  const [promptStyle, setPromptStyle] = useState(promptStyles[0]);
  const [realWorld, setRealWorld] = useState(true);

  const current = stepConfig[step];
  const progress = Math.round((step / (stepConfig.length - 1)) * 100);

  const canContinue = useMemo(() => {
    if (current.id === "schoolName") return schoolName.trim().length > 1;
    if (current.id === "schoolZip") return zip.trim().length === 5;
    if (current.id === "role") return roles.length > 0;
    if (current.id === "grades") return grades.length > 0;
    if (current.id === "subjects") return subjects.length > 0;
    return true;
  }, [current.id, grades.length, roles.length, schoolName, subjects.length, zip]);

  const toggleInList = (value, list, setter) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
      return;
    }
    setter([...list, value]);
  };

  const goNext = () => {
    if (!canContinue) return;
    setStep((prev) => Math.min(prev + 1, stepConfig.length - 1));
  };

  const goBack = () => setStep((prev) => Math.max(prev - 1, 0));
  const goToEnd = () => setStep(stepConfig.length - 1);

  return (
    <main className="page-root">
      <ClassroomBackground />

      <div className="topbar">
        <BrandLogo />
        <div className="progress-wrap">
          <span className="progress-label">{progress}%</span>
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <section className={`card-shell ${current.id === "intro" ? "intro-shell" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="step-view"
          >
            {current.id === "schoolName" && (
              <div className="center-step">
                <h1>What school are you part of?</h1>
                <p>We'll use this to personalize your workspace and connect you with your school community.</p>
                <label className="input-row">
                  <Building2 size={16} />
                  <input
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Type in your school name"
                  />
                </label>
              </div>
            )}

            {current.id === "schoolZip" && (
              <div className="center-step">
                <h1>What school are you part of?</h1>
                <p>We'll use this to personalize your workspace and connect you with your school community.</p>
                <label className="input-row">
                  <MapPin size={16} />
                  <input
                    value={zip}
                    onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    placeholder="School's zip code"
                    inputMode="numeric"
                    maxLength={5}
                  />
                </label>
              </div>
            )}

            {current.id === "role" && (
              <div className="center-step chip-step">
                <h1>What describes you best?</h1>
                <p>Select all that apply</p>
                <div className="chip-grid">
                  {roleOptions.map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      active={roles.includes(option)}
                      onClick={() => toggleInList(option, roles, setRoles)}
                    />
                  ))}
                </div>
              </div>
            )}

            {current.id === "grades" && (
              <div className="center-step chip-step">
                <h1>What grades do you teach?</h1>
                <p>Select all that apply</p>
                <div className="chip-grid">
                  {gradeOptions.map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      active={grades.includes(option)}
                      onClick={() => toggleInList(option, grades, setGrades)}
                    />
                  ))}
                </div>
              </div>
            )}

            {current.id === "subjects" && (
              <div className="center-step chip-step">
                <h1>What subject do you teach?</h1>
                <p>Select all that apply</p>
                <div className="chip-grid">
                  {subjectOptions.map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      active={subjects.includes(option)}
                      onClick={() => toggleInList(option, subjects, setSubjects)}
                    />
                  ))}
                </div>
              </div>
            )}

            {current.id === "intro" && (
              <div className="intro-step">
                <h1>See what Colleague AI can create for your class</h1>
                <div className="intro-content">
                  <div className="intro-card">
                    <p>
                      Hi, I'm Claire! I'll show you how Colleague AI turns a simple teaching goal into a
                      ready-to-use classroom activity.
                    </p>
                    <p>
                      In this quick demo, you'll see what gets created and how you can customize it for your
                      students.
                    </p>
                    <button className="primary-btn" type="button" onClick={goNext}>
                      Show me examples!
                    </button>
                    <button className="text-btn" type="button" onClick={goToEnd}>
                      Skip for now
                    </button>
                  </div>
                  <div className="mascot-wrap">
                    <motion.div
                      className="fox-mascot-clean"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    >
                      <div className="fox-clean-ear fox-clean-ear-left" />
                      <div className="fox-clean-ear fox-clean-ear-right" />
                      <div className="fox-clean-head">
                        <span className="fox-clean-eye fox-clean-eye-left" />
                        <span className="fox-clean-eye fox-clean-eye-right" />
                        <span className="fox-clean-mouth" />
                      </div>
                      <div className="fox-clean-body" />
                      <motion.div
                        className="fox-clean-paw"
                        animate={{ rotate: [14, 34, 14] }}
                        transition={{ repeat: Infinity, duration: 0.95, ease: "easeInOut" }}
                      />
                      <div className="fox-clean-tail" />
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {current.id === "prompt" && (
              <div className="prompt-step">
                <h1>
                  <Sparkles size={28} className="prompt-title-icon" /> Build your first AI prompt with Claire
                </h1>
                <p>Choose a few options and watch your first prompt come together.</p>
                <div className="prompt-row">
                  <span>Create a</span>
                  <SelectLike value={promptType} options={promptTypes} onChange={setPromptType} />
                  <span>for {promptGrade} science about</span>
                  <SelectLike value={promptTopic} options={promptTopics} onChange={setPromptTopic} />
                </div>
                <div className="prompt-row">
                  <span>Have it</span>
                  <SelectLike value={promptStyle} options={promptStyles} onChange={setPromptStyle} />
                  <span>and</span>
                  <label className="check-inline">
                    <input
                      type="checkbox"
                      checked={realWorld}
                      onChange={(e) => setRealWorld(e.target.checked)}
                    />
                    <span>use real-world examples and visuals</span>
                  </label>
                </div>
                <div className="preview-box">
                  <strong>
                    <Sparkles size={16} />
                    Prompt preview:
                  </strong>
                  <p className="preview-text">
                    Create a <AnimatedToken value={promptType.toLowerCase()} /> for {promptGrade.toLowerCase()}{" "}
                    science students about <AnimatedToken value={promptTopic} />. Have it{" "}
                    <AnimatedToken value={promptStyle} />
                    {" and "}
                    <AnimatedToken
                      value={
                        realWorld
                          ? "include real-world examples and at least one visual question."
                          : "include clear written guidance."
                      }
                    />
                  </p>
                </div>
              </div>
            )}

            {current.id === "samples" && (
              <div className="samples-step">
                <h1>
                  See what other <span>8th grade math teachers</span> created with Colleague AI
                </h1>
                <p>Click to preview</p>
                <div className="samples-grid">
                  {sampleCards.map((item) => (
                    <motion.button
                      key={item.title}
                      className="sample-card"
                      type="button"
                      whileHover={{ y: -3 }}
                    >
                      <div className="sample-thumb" />
                      <strong>{item.title}</strong>
                      <span>{item.meta}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {current.id === "complete" && (
              <div className="complete-step">
                <h1>You're all set</h1>
                <p>Your onboarding is complete. Taking you to your workspace...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {current.id !== "intro" && current.id !== "complete" && (
          <footer className="action-bar">
            {step > 0 && !current.hideBack ? (
              <button type="button" className="ghost-btn" onClick={goBack}>
                Back
              </button>
            ) : (
              <div />
            )}
            <div className="action-right">
              {(current.id === "prompt" || current.id === "samples") && (
                <button type="button" className="text-btn" onClick={goNext}>
                  Skip
                </button>
              )}
              <button type="button" className="primary-btn" onClick={goNext} disabled={!canContinue}>
                {current.id === "prompt" || current.id === "samples" ? (
                  <>
                    <Sparkles size={15} />
                    {current.cta}
                  </>
                ) : (
                  current.cta
                )}
              </button>
            </div>
          </footer>
        )}
      </section>
    </main>
  );
}

function SelectLike({ value, options, onChange }) {
  return (
    <label className="select-like">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown size={14} />
    </label>
  );
}

function AnimatedToken({ value }) {
  return (
    <span className="preview-token-wrap">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={value}
          className="preview-token"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default App;
