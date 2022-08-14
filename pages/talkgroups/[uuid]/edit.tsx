import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Axios from "utils/axios";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import Skeleton from "react-loading-skeleton";

import PageContentContainer from "components/PageContentContainer";
import WarningAlert from "components/alerts/WarningAlert";
import BasicCard from "components/cards";
import TableDisplay from "components/tables/tableDisplay";
import SelectMenuSimple from "components/selectMenus/SelectMenuSimple";
import NumberInput from "components/controls/NumberInput";
import Textbox from "components/controls/Textbox";
import TalkgroupModeSelection from "components/controls/radio/TalkgroupModeSelection";
import EncryptedSwitch from "components/switches/radio/EncryptedSwitch";
import Button from "components/controls/Button";
import LinkButton from "components/controls/LinkButton";

import { RefreshIcon } from "@heroicons/react/solid";

import type { TalkGroup } from "types/api/TalkGroup";
import type { ResponseSystemsList } from "types/api/responses/ResponseSystemsList";
import type { AxiosError } from "axios";
import { useAppDispatch } from "state/store/hooks";
import {
  addOrUpdateAppNotification,
  removeAppNotification,
} from "state/slices/appNotificationsSlice";

const EditTalkgroupPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { uuid } = router.query;
  const {
    data: talkgroupData,
    mutate: talkgroupMutate,
    error: talkgroupError,
  } = useSWR<TalkGroup>(`/radio/talkgroup/${uuid}`, fetcher);
  const {
    data: systemsData,
    mutate: systemsMutate,
    error: systemsError,
  } = useSWR<ResponseSystemsList>("/radio/system/list", fetcher);

  const [selectedSystem, setSelectedSystem] = useState<string | undefined>();
  const [decimalId, setDecimalId] = useState<number | undefined>();
  const [alphaTag, setAlphaTag] = useState<string | undefined>();
  const [description, setDescription] = useState<string | null | undefined>();
  const [mode, setMode] = useState<string | undefined>();
  const [encrypted, setEncrypted] = useState<boolean | undefined>();

  const refreshData = () => {
    talkgroupMutate();
  };

  const refreshSystems = () => {
    systemsMutate();
  };

  const saveData = async () => {
    const talkgroupModifications: any = {};

    if (selectedSystem !== talkgroupData?.system.UUID) {
      talkgroupModifications["system"] = selectedSystem;
    }

    if (decimalId !== talkgroupData?.decimal_id) {
      talkgroupModifications["decimal_id"] = decimalId;
    }

    if (alphaTag !== talkgroupData?.alpha_tag) {
      talkgroupModifications["alpha_tag"] = alphaTag;
    }

    if (description !== talkgroupData?.description) {
      talkgroupModifications["description"] = description;
    }

    if (mode !== talkgroupData?.mode) {
      talkgroupModifications["mode"] = mode;
    }

    if (encrypted !== talkgroupData?.encrypted) {
      talkgroupModifications["encrypted"] = encrypted;
    }

    try {
      dispatch(removeAppNotification("EDITTALKGROUPSAVE"));
      const response = await Axios.put(
        `/radio/talkgroup/${uuid}`,
        talkgroupModifications
      );

      if (response.status !== 200) {
        console.log("Edit Talk Group Server Response", response);
        dispatch(
          addOrUpdateAppNotification({
            uniqueId: "EDITTALKGROUPSAVE",
            title: "Error while trying to update talk group",
            titleBold: true,
            description:
              "The server did not return an okay status code while trying to update the talk group.",
            notificationType: "Error",
            dismissable: true,
            hasBorder: true,
            hasIcon: true,
          })
        );
        globalThis.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }
      router.push(`/talkgroups/${uuid}`);
    } catch (ex) {
      const err = ex as AxiosError;
      console.log("Error", err);
      dispatch(
        addOrUpdateAppNotification({
          uniqueId: "EDITTALKGROUPSAVE",
          title: "Error while trying to update talk group",
          titleBold: true,
          description:
            "The server returned an error while trying to update the talk group.",
          extraInformation: `${err.message}${
            err.response?.data && ` - ${JSON.stringify(err.response.data)}`
          }`,
          notificationType: "Error",
          dismissable: true,
          hasBorder: true,
          hasIcon: true,
        })
      );
      globalThis.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setSelectedSystem(talkgroupData ? talkgroupData.system.UUID : undefined);
    setDecimalId(talkgroupData ? talkgroupData.decimal_id : undefined);
    setAlphaTag(talkgroupData ? talkgroupData.alpha_tag : undefined);
    setDescription(talkgroupData ? talkgroupData.description : undefined);
    setMode(talkgroupData ? talkgroupData.mode : undefined);
    setEncrypted(talkgroupData ? talkgroupData.encrypted : undefined);
  }, [talkgroupData]);

  return (
    <>
      <Head>
        {!talkgroupData || talkgroupError ? (
          <title>Edit Talk Group - Trunk-Player</title>
        ) : (
          <title>
            Edit{" "}
            {talkgroupData.alpha_tag
              ? talkgroupData.alpha_tag
              : talkgroupData.decimal_id}{" "}
            Talkgroup - Trunk-Player
          </title>
        )}
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <PageContentContainer>
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {talkgroupError && (
              <WarningAlert>
                Error while requesting talk group data.{" "}
                <button
                  className="underline"
                  onClick={refreshData}
                >
                  Try again
                </button>
              </WarningAlert>
            )}
            {!talkgroupData && !talkgroupError && (
              <h1 className="my-8 text-4xl leading-6 font-medium text-gray-900">
                <Skeleton width={200} />
              </h1>
            )}
            {talkgroupData && (
              <>
                <h1 className="my-8 text-4xl leading-6 font-medium text-gray-900">
                  Edit{" "}
                  {talkgroupData.alpha_tag
                    ? talkgroupData.alpha_tag
                    : talkgroupData.decimal_id}
                </h1>
                {/* <div className="mb-8">
                  <LinkButton href={`/talkgroups/${talkgroupData.UUID}/edit`}>
                    Edit
                  </LinkButton>
                </div> */}
                <BasicCard>
                  <BasicCard.CardHeader divider>
                    Talkgroup Details
                  </BasicCard.CardHeader>
                  <TableDisplay>
                    <TableDisplay.Container>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>
                          System:
                        </TableDisplay.Column>
                        <TableDisplay.Column>
                          {!systemsData && !systemsError && (
                            <Skeleton width={200} />
                          )}
                          {systemsData && selectedSystem && (
                            <>
                              <div className="flex">
                                <SelectMenuSimple
                                  srText="Change system"
                                  selectedUniqueId={selectedSystem}
                                  onChangeSelection={setSelectedSystem}
                                  options={systemsData.results.map(
                                    (system) => ({
                                      title: system.name,
                                      uniqueId: system.UUID,
                                    })
                                  )}
                                />{" "}
                                <button onClick={refreshSystems}>
                                  <RefreshIcon className="w-5 ml-3" />
                                </button>
                              </div>
                            </>
                          )}
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>
                          Decimal ID:
                        </TableDisplay.Column>
                        <TableDisplay.Column>
                          {decimalId !== undefined && (
                            <NumberInput
                              minValue={0}
                              positiveOnly
                              value={decimalId}
                              onNumberChange={setDecimalId}
                            />
                          )}
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>
                          Alpha Tag:
                        </TableDisplay.Column>
                        <TableDisplay.Column>
                          {alphaTag !== undefined && (
                            <Textbox
                              className="w-2/3"
                              value={alphaTag}
                              onChange={(e) => {
                                setAlphaTag(e.target.value);
                              }}
                            />
                          )}
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>
                          Description:
                        </TableDisplay.Column>
                        <TableDisplay.Column>
                          {description !== undefined && (
                            <Textbox
                              className="w-2/3"
                              value={description !== null ? description : ""}
                              onChange={(e) => {
                                setDescription(e.target.value);
                              }}
                            />
                          )}
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>Mode:</TableDisplay.Column>
                        <TableDisplay.Column>
                          {mode && (
                            <TalkgroupModeSelection
                              selectedUniqueId={mode}
                              onChangeSelection={setMode}
                            />
                          )}
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>
                          Encrypted:
                        </TableDisplay.Column>
                        <TableDisplay.Column>
                          {encrypted !== undefined && (
                            <EncryptedSwitch
                              enabled={encrypted}
                              setEnabled={setEncrypted}
                            />
                          )}
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading></TableDisplay.Column>
                        <TableDisplay.Column>
                          <div className="flex justify-end w-full">
                            <LinkButton
                              buttonType="secondary"
                              className="mr-3"
                              href={`/talkgroups/${uuid}`}
                            >
                              Cancel
                            </LinkButton>
                            <Button onClick={saveData}>Save</Button>
                          </div>
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                    </TableDisplay.Container>
                  </TableDisplay>
                </BasicCard>
              </>
            )}
          </div>
        </div>
      </PageContentContainer>
    </>
  );
};

export default EditTalkgroupPage;
