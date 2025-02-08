export const STORAGE_KEY = "invoices";

export const STATUS = {
  ALL_STATUS: "All Status",
  PAID: "Paid",
  PENDING: "Pending",
  UNPAID: "Unpaid",
};

export const QUERY = {
  SEARCH: "search",
  STATUS: "status",
  ALL_STATUS: STATUS.ALL_STATUS,
};

export const OPTION_STATUS = [
  STATUS.ALL_STATUS,
  STATUS.PAID,
  STATUS.UNPAID,
  STATUS.PENDING,
];

export const STATUS_STYLES = {
  Paid: { backgroundColor: "#E6F4EA", color: "#1E8E3E" },
  Unpaid: { backgroundColor: "#FCE8E8", color: "#D93025" },
  Pending: { backgroundColor: "#FEF7E6", color: "#F29D0C" },
};
