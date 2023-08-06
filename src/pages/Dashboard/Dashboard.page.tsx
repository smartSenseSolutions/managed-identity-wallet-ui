import React from "react";
import { useTranslation } from "react-i18next";

type Props = {};

const Dashboard = (props: Props) => {
  const { t } = useTranslation();

  return <div> hi from {t("LABELS.MIW")}</div>;
};

export default Dashboard;
