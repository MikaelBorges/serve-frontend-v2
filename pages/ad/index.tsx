import { useContext, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/userContext/userContext";
import { config } from "../../utils/config";
import { AdForm } from "../../components/adForm/adForm";
import { AdFormType } from "../../components/adForm/types";
import { MessageCreateAdType } from "./types";

export default function NewAdPage() {
  const userCtx = useContext(UserContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponseMessage, setApiResponseMessage] = useState<MessageCreateAdType | null>(null);

  const submit: SubmitHandler<AdFormType> = async (data) => {
    try {
      setApiResponseMessage(null);
      setIsLoading(true);

      const response = await fetch(`${config.api_url}/user/ad/${userCtx.user?._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setApiResponseMessage({
          text: "Votre annonce a bien été créée",
          statusIsSuccess: true,
        });
      } else {
        setApiResponseMessage({
          text: "Erreur, votre annonce n'a pas été créée",
          statusIsSuccess: false,
        });
      }
    } catch (error) {
      setApiResponseMessage({
        text: `Erreur : ${error}`,
        statusIsSuccess: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userStorageDirty = localStorage.getItem("userStorage");
    const userStorage = userStorageDirty ? JSON.parse(userStorageDirty) : null;
    console.log("userStorage", userStorage);
    if (!userStorage.token) router.push("/");
  }, [router]);

  return (
    <>
      <h1 className="text-3xl">Nouvelle annonce</h1>

      <AdForm isLoading={isLoading} disabled={Boolean(apiResponseMessage?.statusIsSuccess)} onSubmit={submit} />

      {apiResponseMessage && (
        <p className={apiResponseMessage.statusIsSuccess ? "text-green-500" : "text-red-500"}>
          {apiResponseMessage.text}
        </p>
      )}
    </>
  );
}
