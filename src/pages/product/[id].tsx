import Link from "next/link";
import fetcher from "../../libs/fetcher";
import { GetServerSideProps, GetStaticProps, GetStaticPaths } from "next";

import useSWR from "swr";
import Layout from "../../components/layout";

const getURL = (id) => `https://beta-api.phatthanhcafe.com/product?id=${id}`;
const URL_PRODUCT_LIST = "https://beta-api.phatthanhcafe.com/product/all";

export default function Product({ id, initialData }) {
  const { data } = useSWR(getURL(id), fetcher, { initialData });

  return (
    <div style={{ alignItems: "center" }}>
      {data ? (
        <div>
          <img
            src={`https://phatthanhcafe.com${data.images[0]}`}
            alt={data.name}
          />
          <p>Name: {data.name}</p>
          <p>Price: {data.price}</p>
          <p>Description: {data.description}</p>
        </div>
      ) : (
        "loading..."
      )}
    </div>
  );
}

// export const getAllProductIds = async () => {
//   const products = await fetcher(URL_PRODUCT_LIST);
//   return products.map((product) => {
//     return {
//       params: {
//         id: product.id.toString(),
//       },
//     };
//   });
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = await getAllProductIds();
//   debugger;
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const data = await fetcher(getURL(params.id));
//   return { props: { initialData: data, id: params.id } };
// };

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = await fetcher(getURL(query.id));
  return { props: { initialData: data, id: query.id } };
};
