const ApplicationTable = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
          <tr>
            <th className="p-4">Subject</th>
            <th className="p-4">Status</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-4">{item.subject}</td>

              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    item.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : item.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-4">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;