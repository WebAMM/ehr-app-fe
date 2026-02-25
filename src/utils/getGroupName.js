export const getGroupName = (timestamp) => {
  const now = new Date();
  const notificationDate = new Date(timestamp);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const notifDate = new Date(
    notificationDate.getFullYear(),
    notificationDate.getMonth(),
    notificationDate.getDate(),
  );
  if (notifDate.getTime() === today.getTime()) return "Today";
  if (notifDate.getTime() === yesterday.getTime()) return "Yesterday";

  return notificationDate.toLocaleDateString();
};