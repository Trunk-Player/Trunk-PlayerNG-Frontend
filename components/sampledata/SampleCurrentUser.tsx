import { ReactNode, useEffect } from "react";
import { selectCurrentUser, setCurrentUser } from "state/slices/userSlice";
import { useAppDispatch, useAppSelector } from "state/store/hooks";

interface SampleCurrentUserProps {
  children?: ReactNode;
}

const SampleCurrentUser = ({ children }: SampleCurrentUserProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!user) {
      dispatch(
        setCurrentUser({
          id: 1234,
          enabled: true,
          email: "sampleuser@somewhere.com",
          firstName: "Sample",
          lastName: "User",
          userProfile: {
            uuid: "A123B456",
            siteAdmin: true,
            feedAllowed: true,
          },
        })
      );
    }
  }, []);

  return <>{children}</>;
};

export default SampleCurrentUser;
