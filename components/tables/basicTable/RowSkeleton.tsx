import Skeleton from "react-loading-skeleton";

interface RowSkeletonProps {
  rows: number;
  cols: number;
}

const RowSkeleton = ({ rows, cols }: RowSkeletonProps) => {
  return (
    <>
      {[...Array(rows)].map((_, i1) => (
        <tr key={i1}>
          {[...Array(cols)].map((_, i2) => (
            <td
              key={i2}
              className="bg-white px-6 py-4"
            >
              <Skeleton />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default RowSkeleton;
