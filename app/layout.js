import "./globals.css";

export const metadata = {
  title: "UPOU Executive Briefing Deck",
  description:
    "Operational Intelligence deck for UPOU Management comparing Vimeo, Panopto, and Kaltura across ODeL delivery, governance, pricing behavior, and infrastructure choice."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
