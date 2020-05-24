import Link from "next/link";
import fetcher from "../libs/fetcher";
import { GetServerSideProps, GetStaticProps } from "next";
import useSWR from "swr";

const URL_PRODUCT_LIST = "https://beta-api.phatthanhcafe.com/product/all";

export default function Home({ initialData }) {
  const { data } = useSWR(URL_PRODUCT_LIST, fetcher, { initialData });

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Trending Projects</h1>
      <div>
        {data
          ? data.map((product) => (
              <p key={product.id}>
                <Link href='/product/[id]' as={`/product/${product.id}`}>
                  {product.unit && product.code ? (
                    <a>
                      {product.name} . {product.unit} . {product.code}
                    </a>
                  ) : (
                    <a>{product.name}</a>
                  )}
                </Link>
              </p>
            ))
          : "loading..."}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetcher(URL_PRODUCT_LIST);
  return { props: { initialData: data } };
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(URL_PRODUCT_LIST);
  return { props: { initialData: data } };
};
