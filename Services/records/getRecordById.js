import recordData from "../../Data/records.json" assert { type: "json" };

const getRecordById = (id) => {
  const record = recordData.records.find((record) => record.id === id);
  if (!record) {
    return null;
  }
  return record;
};

export default getRecordById;
