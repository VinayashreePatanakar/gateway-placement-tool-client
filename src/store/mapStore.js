import { create } from "zustand";

export const useMapStore = create((set) => ({
  image: null,
  elements: [],
  counts: { sensor: 0, gateway: 0, repeater: 0 },

  setImage: (image) => set({ image }),

  addElement: (type) =>
    set((state) => {
      const newCount = state.counts[type] + 1;
      const color =
        type === "gateway"
          ? "rgba(194, 242, 199, 0.4)"
          : type === "repeater"
          ? "rgba(240,230,140 ,0.4)" 
          : "rgba(0, 0, 0)";
      const label =
        type === "gateway"
          ? `G${newCount}`
          : type === "repeater"
          ? `R${newCount}`
          : `S${newCount}`;

  

      const newElement = {
        id: Date.now(),
        type,
        x: 550,
        y: 150,
        color,
        label,
        radius: type === "gateway" ? 100 : type === "repeater" ? 100 : 15,
  width: type === "sensor" ? 30 : undefined,
  height: type === "sensor" ? 30 : undefined,
      };

      return {
        elements: [...state.elements, newElement],
        counts: { ...state.counts, [type]: newCount },
      };
    }),

    removeElementByType: (type) =>
  set((state) => {
    // Find last element of this type
    const idx = state.elements.map((el) => el.type).lastIndexOf(type);

    if (idx !== -1) {
      state.elements.splice(idx, 1); // remove element
      const newCount = Math.max(0, state.counts[type] - 1); // decrement count
      return {
        elements: [...state.elements],
        counts: { ...state.counts, [type]: newCount },
      };
    }

    return state; // nothing to remove
  }),


  updateElementPosition: (id, x, y) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, x, y } : el
      ),
    })),

  reset: () => set({ elements: [], counts: { sensor: 0, gateway: 0, repeater: 0 } }),
}));
