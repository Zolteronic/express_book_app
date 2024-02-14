import recordsData from "../../Data/records.json" assert { type: "json" };

const getRecords = (artist, genre, available) => {
  let records = recordsData.records;

  if (artist) {
    records = records.filter((record) => record.artist === artist);
  }

  if (genre) {
    records = records.filter((record) => record.genre === genre);
  }

  if (available) {
    records = records.filter(
      (record) => record.available === JSON.parse(available)
    );
  }
  return records;
};

export default getRecords;
