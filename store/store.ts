/* eslint-disable @typescript-eslint/ban-types */
import { create } from 'zustand';

interface StoreState {
  changeSize: (size: string) => void;
  country: {} | null;
  color: string;
  padding: string;
  backgroundColor: string;
  canvasSize: string;
  size: string;
  density: string;
  setSelectedCountry: (country: string) => void;
  changeColor: (color: string) => void;
  changePadding: (padding: string) => void;
  changeBackground: (backgroundColor: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  country: null,
  color: '#ffffff',
  padding: '1',
  backgroundColor: '#0E0D0F',
  canvasSize: '',
  size: '0.5',
  density: '',
  setSelectedCountry: (country: string) => set({ country }),
  changeColor: (color: string) => set({ color }),
  changeSize: (size: string) => set({ size }),
  changePadding: (padding: string) => set({ padding }),
  changeBackground: (backgroundColor: string) => set({ backgroundColor }),
}));
