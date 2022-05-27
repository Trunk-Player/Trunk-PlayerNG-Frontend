import Link from "next/link";
import BasicCard from "components/cards";
import TableDisplay from "components/tables/tableDisplay";
import { TalkGroup } from "types/api/TalkGroup";

interface TalkgroupEditProps {
  data: TalkGroup;
}

const TalkgroupEdit = ({ data }: TalkgroupEditProps) => {
  return data ? (
    <>
      <BasicCard dataTestId="talkgroupDetails">
        <BasicCard.CardHeader divider>Talkgroup Details</BasicCard.CardHeader>
        <TableDisplay>
          <TableDisplay.Container>
            <TableDisplay.Row hasUpdate>
              <TableDisplay.Column heading>System:</TableDisplay.Column>
              <TableDisplay.Column
                dataTestId="system"
                className="font-medium text-cyan-600 hover:text-cyan-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <Link href={`/systems/${data.system.UUID}`}>
                  {data.system.name}
                </Link>
              </TableDisplay.Column>
            </TableDisplay.Row>
            <TableDisplay.Row hasUpdate>
              <TableDisplay.Column heading>Decimal ID:</TableDisplay.Column>
              <TableDisplay.Column dataTestId="decimal_id">
                {data.decimal_id}
              </TableDisplay.Column>
            </TableDisplay.Row>
            <TableDisplay.Row hasUpdate>
              <TableDisplay.Column heading>Alpha Tag:</TableDisplay.Column>
              <TableDisplay.Column dataTestId="alpha_tag">
                {data.alpha_tag}
              </TableDisplay.Column>
            </TableDisplay.Row>
            <TableDisplay.Row hasUpdate>
              <TableDisplay.Column heading>Description:</TableDisplay.Column>
              <TableDisplay.Column dataTestId="description">
                {data.description}
              </TableDisplay.Column>
            </TableDisplay.Row>
            <TableDisplay.Row hasUpdate>
              <TableDisplay.Column heading>Mode:</TableDisplay.Column>
              <TableDisplay.Column dataTestId="mode">
                {data.mode}
              </TableDisplay.Column>
            </TableDisplay.Row>
            <TableDisplay.Row hasUpdate>
              <TableDisplay.Column heading>Encrypted:</TableDisplay.Column>
              <TableDisplay.Column dataTestId="encrypted">
                {data.encrypted ? "Yes" : "No"}
              </TableDisplay.Column>
            </TableDisplay.Row>
          </TableDisplay.Container>
        </TableDisplay>
      </BasicCard>
      <BasicCard dataTestId="agenciesDetails" className="mt-5">
        <BasicCard.CardHeader divider>Agencies</BasicCard.CardHeader>
        <TableDisplay>
          <TableDisplay.Container>
            {data.agency && data.agency.length > 0 ? (
              data.agency.map((agency) => (
                <TableDisplay.Row key={agency.UUID} hasUpdate>
                  <TableDisplay.Column
                    heading
                    className="font-medium text-cyan-600 hover:text-cyan-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    <Link href={`/agencies/${agency.UUID}`}>{agency.name}</Link>
                  </TableDisplay.Column>
                  <TableDisplay.Column>
                    {agency.description}
                  </TableDisplay.Column>
                </TableDisplay.Row>
              ))
            ) : (
              <TableDisplay.Row>No Agencies</TableDisplay.Row>
            )}
          </TableDisplay.Container>
        </TableDisplay>
      </BasicCard>
    </>
  ) : (
    <></>
  );
};
export default TalkgroupEdit;
