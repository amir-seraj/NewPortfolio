import KeystaticApp from "./keystatic";
import { isKeystaticAvailable } from "../../../keystatic.config";

export default function KeystaticLayout() {
  if (!isKeystaticAvailable) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
          background: "#171717",
          color: "#f7f4ee",
        }}
      >
        <div style={{ maxWidth: "42rem" }}>
          <p style={{ color: "#ffb000", fontWeight: 700 }}>Content studio</p>
          <h1>GitHub editing is not configured yet.</h1>
          <p style={{ lineHeight: 1.6 }}>
            Add the four Keystatic GitHub App variables described in the
            repository README, then redeploy. Local editing remains available
            through <code>npm run dev</code>.
          </p>
        </div>
      </main>
    );
  }

  return <KeystaticApp />;
}
