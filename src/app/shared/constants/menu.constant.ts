import { MAIN_ROUTES } from '@shared/constants/routes.constant';
import { TabItemModel } from '@tetu_io/tetu-ui';
import { environment } from "@environments/environment";

export const MENU_TABS: TabItemModel[] = [
  {
    id: 'home',
    url: 'https://app.tetu.io',
    title: 'HOME',
    titleMobile: 'Home',
    isActive: false,
    isLink: true,
    isSubMenuItem: false,
  },
  {
    id: 'invest',
    url: MAIN_ROUTES.EARN,
    title: 'EARN',
    titleMobile: 'Earn',
    isActive: false,
    isLink: false,
    isSubMenuItem: false,
  },
  {
    id: 'liquids-stacking',
    title: 'LIQUID STACKING',
    titleMobile: 'Liquid Stacking',
    isActive: false,
    isLink: false,
    isSubMenuItem: false,
    subMenu: [
      {
        id: 'tetu-qi',
        url: MAIN_ROUTES.TETU_QI,
        title: 'TETUQU',
        titleMobile: 'TetuQI',
        isActive: false,
        isLink: false,
        isSubMenuItem: true,
      },
      {
        id: 'tetu-mesh',
        url: MAIN_ROUTES.TETU_MESH,
        title: 'TETUMESH',
        titleMobile: 'TetuMesh',
        isActive: false,
        isLink: false,
        isSubMenuItem: true,
      },
      {
        id: 'tetu-bal',
        url: MAIN_ROUTES.TETU_BAL,
        title: 'TETUBAL',
        titleMobile: 'TetuBal',
        isActive: false,
        isLink: false,
        isSubMenuItem: true,
      },
    ],
  },
].map(it => {
  return new TabItemModel({
    ...it,
    subMenu: it.subMenu && it.subMenu.length > 0 ? it.subMenu?.map(subItem => new TabItemModel(subItem)) : null,
  });
});

const AVAILABLE_FEATURES: string[] =
  environment['AVAILABLE_FEATURES']
  ? environment['AVAILABLE_FEATURES'].split(',')
  : []
// [];
export const MENU_TABS_FILTERED: TabItemModel[] = MENU_TABS.filter(it => {
  return AVAILABLE_FEATURES.length === 0 || (AVAILABLE_FEATURES.length > 0 && AVAILABLE_FEATURES.includes(it.id));
});
