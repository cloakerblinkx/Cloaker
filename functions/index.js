const functions = require("firebase-functions");
const axios = require("axios");

const headers = {
  Authorization: "Bearer h3zdc76m51UIDP41HmfQia3j",
  "Content-Type": "application/json",
};

 
const VERCEL_BASE_URL = "https://api.vercel.com";

// Step 1: Get All Project Info
exports.getAllProjectInfo = functions.https.onRequest(async (req, res) => {
  try {
    const response = await axios.get(`${VERCEL_BASE_URL}/v9/projects`, {
      headers,
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.response?.data || error.message });
  }
});

// Step 2: Get All Deployment Details
exports.getAllDeploymentDetails = functions.https.onRequest(async (req, res) => {
  try {
    const response = await axios.get(`${VERCEL_BASE_URL}/v6/deployments`, {
      headers,
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.response?.data || error.message });
  }
});

// Step 3: Generate New Domains
exports.createDomain = functions.https.onRequest(async (req, res) => {
  const domainName = req.body.name; 
  if (!domainName) {
    return res.status(400).send({ error: "Domain name is required" });
  }
  try {
    const response = await axios.post(
      `${VERCEL_BASE_URL}/v9/projects/cloaker/domains`,
      { name: domainName },
      { headers }
    );
    res.status(201).send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.response?.data || error.message });
  }
});

// Step 4: Delete Previous Domains
exports.deleteDomain = functions.https.onRequest(async (req, res) => {
  const projectId = "prj_axRVh19ZXb6J2V1cTxIRHpSGSF0E";
  const domainName = req.body.name;
  if (!domainName) {
    return res.status(400).send({ error: "Domain name is required" });
  }
  try {
    const response = await axios.delete(
      `${VERCEL_BASE_URL}/v9/projects/${projectId}/domains/${domainName}`,
      { headers }
    );
    res.status(200).send({ message: "Domain deleted successfully", data: response.data });
  } catch (error) {
    res.status(500).send({ error: error.response?.data || error.message });
  }
});

// Step 5: Get All Existing Domains
exports.getAllDomains = functions.https.onRequest(async (req, res) => {
  const projectId = "prj_axRVh19ZXb6J2V1cTxIRHpSGSF0E";
  const teamId = "team_4GQzPdZT7ker0Ylkm901Z7aN";
  try {
    const response = await axios.get(
      `${VERCEL_BASE_URL}/v9/projects/${projectId}/domains?teamId=${teamId}`,
      { headers }
    );
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.response?.data || error.message });
  }
});
