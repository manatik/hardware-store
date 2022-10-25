export interface SliderMockItem {
  id: number;
  image: any;
  title: string;
  description: string;
  width: number;
  height: number;
}

export interface MockLink {
  link: string,
  title: string,
}

export interface ServiceSlide {
  image: any,
  title?: string,
  number?: string,
}

export type SliderMock = SliderMockItem[]

export type MockLinksTypes = MockLink[]

export type MockServiceSlide = ServiceSlide[]
