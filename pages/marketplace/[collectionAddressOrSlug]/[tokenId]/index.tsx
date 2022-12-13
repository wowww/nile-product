import { useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import MarketplaceDetailTop from '@components/marketplace/detail/MarketplaceDetailTop';
import MarketplaceDetailBottom from '@components/marketplace/detail/MarketplaceDetailBottom';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { NileApiService } from '@/services/nile/api';
import axios from 'axios';
import Web3 from 'web3';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { NileCollectionResult } from '@/models/nile/marketplace/NileCollection';
import NileNft, { NileNftMetadata } from '@/models/nile/marketplace/NileNft';
import { useAtom } from 'jotai';
import { actionBarAtom } from '@/state/modalAtom';

const NftDetailPage = () => {
  const [actionBar, setActionsBar] = useAtom(actionBarAtom);
  const detailBottomRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<Document>();
  const api = NileApiService();

  const [nft, setNft] = useState<NileNft>();
  const router = useRouter();

  const [recommend, setRecommend] = useState<NileCollectionResult>();

  const [metadata, setMetadata] = useState<NileNftMetadata>();

  const { query } = useRouter();

  const { collectionAddressOrSlug, tokenId } = query;
  const { collectionSlug, collectionAddress } = {
    collectionSlug: Web3.utils.isAddress(String(collectionAddressOrSlug)) ? undefined : String(collectionAddressOrSlug),
    collectionAddress: Web3.utils.isAddress(String(collectionAddressOrSlug)) ? String(collectionAddressOrSlug) : undefined,
  };

  useEffect(() => {
    api.marketplace.nft
      .getItem({ collectionSlug, collectionAddress, tokenId: Number(tokenId) })
      .then(({ data }) => {
        setNft(data);

        if (!data?.token) {
          router.push('/marketplace');
        }
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    api.marketplace.collection
      .getItem(
        {
          slug: 'LUS',
        },
        true,
        4,
      )
      .then(({ data }) => setRecommend(data))
      .catch(() => null);
  }, []);

  useEffect(() => {
    const metadataUri = nft?.token?.uri;
    if (metadataUri) {
      axios.get(metadataUri).then(({ data }) => {
        setMetadata(data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [nft]);

  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        const { pageYOffset } = window;
        const bottomOffset = detailBottomRef.current?.offsetTop as number;

        setActionsBar(pageYOffset >= bottomOffset);

      }, 300),
    [],
  );

  useEffect(() => {
    documentRef.current = document;
    const documentCurrent = documentRef.current;

    documentCurrent.addEventListener('scroll', throttleHandler);
    return () => {
      documentCurrent.removeEventListener('scroll', throttleHandler);
    };
  }, [throttleHandler]);

  return (
    <>
      <Helmet>
        <title>Marketplace &gt; NILE</title>
        <body className={cn('has-floating')} />
      </Helmet>
      <div className={cn('marketplace-detail-wrap')}>
        <MarketplaceDetailTop nft={nft} metadata={metadata} />
        <MarketplaceDetailBottom ref={detailBottomRef} item={nft} metadata={metadata} recommendList={recommend?.result} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const translations = await serverSideTranslations(locale ?? 'en', ['marketplace', 'common']);

  return { props: { ...translations } };
};

export default NftDetailPage;
