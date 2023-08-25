// Dummy data to be replaced with your database
const hostnamesDB = [
  {
    name: "Store 1",
    subdomain: "store1",
    defaultForPreview: true,
  },
  {
    name: "This is Site 2",
    subdomain: "store2",
  },
  {
    name: "This is Site 3",
    subdomain: "store3",
  },
];
const DEFAULT_HOST = hostnamesDB.find((h) => h.defaultForPreview);

export async function getSubdomainPaths() {
  return hostnamesDB.map((item) => {
    return item.subdomain;
  });
}

export default hostnamesDB;
