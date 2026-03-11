import "./globals.css";

export const metadata = {
  title: "Strategic Evaluation: Vimeo for UPOU OER Infrastructure",
  description:
    "Professional strategic evaluation website for UP Open University on Vimeo pricing, bandwidth risk, and enterprise procurement."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
