import {
  AuthenticationRequest,
  AuthenticationResult,
} from "@feathersjs/authentication/lib";
import { Application, Params } from "@feathersjs/feathers";
import { useCallback, useMemo, useState } from "react";
import { UserAttributes } from "types/global";

export const useAuthController = (props: {
  client: Application;
}): AuthControllerResult => {
  const { client } = props;
  const [account, setAccount] = useState<UserAttributes | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = useMemo(() => {
    return account !== null;
  }, [account]);

  const authenticate = useCallback<AuthControllerResult["authenticate"]>(
    async (data) => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const res: AuthenticationResult = await client.authenticate(
          { strategy: "local", ...data },
          {
            // ...params,
            strategy: "local",
          }
        );
        const account = res.user as UserAttributes;
        console.log({ account });
        setAccount(account);
        setIsLoading(false);
        return res;
      } catch (err: unknown | undefined) {
        setAccount(null);
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        throw new Error(err);
      }
    },
    [client]
  );

  const reAuthenticate = useCallback<AuthControllerResult["reAuthenticate"]>(
    async (force?, strategy?) => {
      // await setIsLoading(true);
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const res = await client.reAuthenticate(force, strategy);
        const user = res.user;
        await setIsLoading(false);
        setAccount(user);
        return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        await setIsLoading(false);
        setAccount(null);
        throw new Error(err);
      }
    },
    [client]
  );

  const logout = useCallback<AuthControllerResult["logout"]>(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = await client.logout();
      setAccount(null);
      return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err);
    }
  }, [client]);

  // useEffect(() => {
  //   if (account !== null) return;
  //   if (!client) return;
  //   console.log(account);
  //   const fetch = async () => {
  //     setIsLoading(true);
  //     try {
  //       const res = await client.reAuthenticate();
  //       const account = res.account;
  //       await setAccount(account);
  //     } catch (err) {
  //       console.error(err);
  //       await setAccount(null);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetch();
  // }, []);

  return {
    account,
    isLoggedIn,
    isLoading,

    authenticate: authenticate,
    reAuthenticate: reAuthenticate,
    logout: logout,
  };
};

export interface AuthControllerResult {
  account: UserAttributes | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  authenticate: (
    authentication?: AuthenticationRequest,
    params?: Params
  ) => Promise<AuthenticationResult>;
  reAuthenticate: (
    force?: boolean,
    strategy?: string
  ) => Promise<AuthenticationResult>;
  logout(): Promise<AuthenticationResult | null>;
}
