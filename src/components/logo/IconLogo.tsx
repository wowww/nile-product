import { ReactSVG } from 'react-svg';
import { useMemo } from 'react';

type Props = {
  type: string | undefined;
  size: number;
  fullType?: boolean;
};

{
  /*
   * wemix$ : 위믹스달러
   * wemix$_dark: 위믹스달러 다크 모드
   * wemix : 위믹스
   * wemix_dark: 위믹스 다크 모드
   * sol : 솔라나
   * usdc
   * dai : 다이
   * busd
   * usdt
   * eth : 이더리움
   * btc : 비트코인
   * xrp : 리플
   * ada : 에이다
   * dot : 폴카닷
   * wbnb
   * klay
   * wallet
   * metamask
   * wonder : wonder dao token
   * g.wonder : governance token
   * wemixfi : wemixfi token
   * kiaf : kiaf token
   * dummy: 없음 토큰
   */
}

type iconType = {
  [index: string]: string;
};

export const IconLogo = ({ type, size, fullType = false }: Props) => {
  const icon: iconType = useMemo(
    () => ({
      wemix$: '/token/icon_wemix$',
      wemix$_dark: '/token/icon_dark_wemix$',
      wemix: '/token/icon_wemix',
      wemix_dark: '/token/icon_dark_wemix',
      sol: '/token/icon_sol',
      usdc: '/token/icon_usdc',
      dai: '/token/icon_dai',
      busd: '/token/icon_busd',
      usdt: '/token/icon_usdt',
      eth: '/token/icon_eth',
      btc: '/token/icon_btcb',
      xrp: '/token/icon_xrp',
      ada: '/token/icon_ada',
      dot: '/token/icon_dot',
      wbnb: '/token/icon_wbnb',
      klaytn: '/token/icon_klaytn',
      klay: '/token/icon_klaytn',
      wallet: '/token/icon_wemix_wallet',
      metamask: '/token/icon_metamask',
      wonder: fullType ? '/daotokens/ico_wonder_full' : '/daotokens/ico_wonder',
      'g.wonder': fullType ? '/daotokens/ico_gwonder_full' : '/daotokens/ico_gwonder',
      wemixfi: '/daotokens/ico_wemixfi',
      kiaf: '/daotokens/ico_kiaf',
      tangled: '/token/ico_tipo',
      tipo: '/token/ico_tipo',
      snkrz: '/token/ico_skz',
      skz: '/token/ico_skz',
      placeholder1: '/token/icon_placeholder1',
      placeholder2: '/token/icon_placeholder2',
    }),
    []
  );

  console.log(icon['wemix']);

  return (
    <ReactSVG
      src={`https://nile.blob.core.windows.net/images/assets/images/icon${icon[type ?? ""]}.svg`}
      beforeInjection={(svg) => {
        svg.classList.add('svg-class-name');
        svg.setAttribute('style', `width: ${size}px`);
        svg.setAttribute('style', `height: ${size}px`);
      }}
    />
  );
};
