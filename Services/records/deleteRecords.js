import recordData from "../../Data/records.json" assert { type: "json" };

const deleteRecords = (id) => {
  const index = recordData.records.findIndex((record) => record.id === id);

  if (index === -1) {
    return null;
  }

  recordData.records.splice(index, 1);
  return id;
};

export default deleteRecords;
