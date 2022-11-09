import jsonData from "./data/data.json";

export class InformationReference {
  getItemByCode(code = null) {
    if (!code) return jsonData;
    return jsonData.find((data) => {
      return data.code === code;
    });
  }

  getItemByType(typeName) {
    return jsonData.find((data) => data.type === typeName);
  }

  getAccounts() {
    return jsonData.find((value) => value["accounts"]).accounts;
  }
}
