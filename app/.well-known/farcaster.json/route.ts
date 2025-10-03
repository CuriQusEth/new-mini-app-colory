import { withValidManifest } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../../../minikit.config";
  "baseBuilder": {
    "allowedAddresses": ["0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B"]
  }
export async function GET() {
  return Response.json(withValidManifest(minikitConfig));
}
