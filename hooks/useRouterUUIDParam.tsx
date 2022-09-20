import { useRouter } from "next/router";

export const useRouterUUIDParam = () => {
  const router = useRouter();
  const { uuid } = router.query;

  return uuid as string;
};
