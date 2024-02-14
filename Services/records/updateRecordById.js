import recordData from "../../Data/records.json" assert { type: "json" };

const updateRecordById = (id, title, artist, year, available, genre) => {
  const records = recordData.records.find((record) => record.id === id);
  if (records === -1) {
    return null;
  }
  records.title = title ?? records.title;
  records.artist = artist ?? records.artist;
  records.year = year ?? records.year;
  records.available = available ?? records.available;
  records.genre = genre ?? records.genre;

  return records;
};

export default updateRecordById;
