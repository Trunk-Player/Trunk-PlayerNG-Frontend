// import { useTranslations } from "next-intl";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";

import PageHeader from "@/components/PageHeader";
import DashboardHeader from "./components/DashboardHeader";
import Container from "@/components/Container";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Trunk-Player",
};

export default async function DashboardPage() {
  const session = await getServerSession(OPTIONS);

  return (
    <>
      <PageHeader>
        <DashboardHeader session={session!} />
      </PageHeader>
      <Container>
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* <h2 className="mt-8 text-lg leading-6 font-medium text-gray-900">
              Scanners
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <CreateNewScanner />
            </div> */}
            {/* <h2 className="mt-8 text-lg leading-6 font-medium text-gray-900">
              Transmissions
            </h2>
            <div className="mt-2">
              <div className="mt-2">
                <CallCard data={dataNormal} />
              </div>
              <div className="mt-2">
                <CallCard data={dataEmergency} />
              </div>
            </div> */}
          </div>
        </div>
      </Container>
    </>
  );
}
