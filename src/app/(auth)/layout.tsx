import AuthError from "@/components/auth/AuthError";
import Page from "@/components/layout/Page";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Page centered className="w-full max-w-lg mx-auto space-y-4">
      <div className="space-y-2">
        <AuthError />

        <div className="badge badge-primary badge-outline font-semibold">
          Trusted by 5,000+ Families
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
          Care you can <span className="text-primary">trust.</span>
        </h1>
        <p className="text-base-content/70 leading-relaxed">
          Whether it&apos;s for your little ones or your elders, Care-IO
          connects you with verified professionals who treat your family like
          their own.
        </p>
      </div>

      {children}
    </Page>
  );
}
