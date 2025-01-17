const functions = require("firebase-functions");
const axios = require("axios");

const VERCEL_API_TOKEN = "brQINw77RRmKKGgKjwI4jjKi"; 
const VERCEL_PROJECT_ID = "prj_axRVh19ZXb6J2V1cTxIRHpSGSF0E"; 
const BASE_DOMAIN = "cloaker-beta.vercel.app"; 

exports.deployToVercel = functions.https.onRequest(async (req, res) => {
  const customSubdomain = `deploy-${Date.now()}`; 
  const customDomain = `${customSubdomain}.${BASE_DOMAIN}`;

  try {
    const deployResponse = await axios.post(
      "https://api.vercel.com/v13/deployments",
      {
        name: "cloaker",
      },
      {
        headers: {
          Authorization: `Bearer ${VERCEL_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        params: {
          projectId: VERCEL_PROJECT_ID,
        },
      }
    );

    const deploymentId = deployResponse.data.id;

    const aliasResponse = await axios.post(
      `https://api.vercel.com/v2/deployments/${deploymentId}/aliases`,
      { domain: customDomain },
      {
        headers: {
          Authorization: `Bearer ${VERCEL_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).send({
      success: true,
      deploymentUrl: aliasResponse.data.url,
      customDomain,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});
