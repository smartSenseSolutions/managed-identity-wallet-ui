import { getDidDocument } from "@miw/APIs/DidManagement.api";
import {
  postCreateWallet,
  getWalletList,
  createPresentation,
} from "./VcManagement.api";
import { getMyCreds } from "./MyCredentials.api";

export {
  createPresentation,
  getWalletList,
  getMyCreds,
  getDidDocument,
  postCreateWallet,
};
