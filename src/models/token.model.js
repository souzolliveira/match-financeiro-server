const { insertTokenDAO } = require("../dao/token.dao");

exports.createTokenModel = async ({ token, token_type, user_id }) => {
  try {
    const insertToken = await insertTokenDAO({ token, token_type, user_id });
    return insertToken;
  } catch {
    return null;
  }
};
