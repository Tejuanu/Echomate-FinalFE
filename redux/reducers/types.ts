export interface GenerateInitState {
  [key: string]: any;
  removingBackground: boolean;
  removeBackgroundResponse: any;
  removeBackgroundError: any;
  enhancingImage: boolean;
  enhanceImageResponse: any;
  enhanceImageError: any;
  fetchingThemesImage: boolean;
  themesImageList: { theme: string; image: string }[];
  themeImageError: any;
  generatingImage: boolean;
  generateImageResponse: any;
  historyGeneratedImages: any;
  generateImageError: any;
  generatingThemeBasedImage: boolean;
  generateThemeBasedImageResponse: any;
  generateThemeBasedImageError: any;
  generatingCampaignBasedImage: boolean;
  generateCampaignBasedImageResponse: any;
  generateCampaignBasedImageError: any;
  generatingVisualConceptImage: boolean;
  generateVisualConceptImageResponse: any;
  generateVisualConceptImageError: any;
  savingGeneratedImage: boolean;
  saveGeneratedImageResponse: any;
  saveGeneratedImageError: any;
  savingProductImage: boolean;
  saveProductImageResponse: any;
  saveProductImageError: any;
  bookmarkingImage: boolean;
  bookmarkImageResponse: any;
  bookmarkImageError: any;
  fetchingBookmarkedImage: boolean;
  getBookmarkedImageResponse: any;
  getBookmarkedImageError: any;
  fetchingNoOfImageLeft: boolean;
  getNoOfImageLeftResponse: any;
  getNoOfImageLeftError: any;
  fetchingProductPageUrlImage: boolean;
  getProductPageUrlImageResponse: any;
  getProductPageUrlImageError: any;
  fetchingElementsImageList: boolean;
  getElementsImageListResponse: any;
  getElementsImageListError: any;
  generateImagePayload: {
    selectedTab: string;
    selectedHintsTab: string;
    customScene: {
      ratio: string;
      color: string;
      selectedCustomSceneTab: string;
      selectedIndoorTab: string;
      selectedPlacementValue: string;
      selectedShadowValue: string;
      selectedColor: string;
      selectedTextureSurfacePalette: string;
      selectedTextureSurfacePaletteFile: string;
      promptValue: string;
      selectedLifestyleShadowValue: string;
    };
    themeBasedState: any;
    visualConceptState: any;
    personaBasedState: {
      minAge: number | string;
      maxAge: number | string;
      demographicState: any;
      location: string;
      gender: string;
      demographicList?: any[]
      behaviourList?: any[]
      interestList?: any[]

    };
    noOfGeneratedImage: number;
    matchStyleState: any[];
    selectedRefImageStyle: string;
    selectedRefImageStyleFile: string;
    photoAttributes: any[];
    resizeCanvas: {
      headerTitle: string;
      title: string;
      width: string;
      height: string;
      newCanvasHeight: number;
      newCanvasWidth: number;
    };
    existingAssets: any[];
  };
  selectedGeneratedImageState: {
    index: string;
    imageListState: string;
  };
}
