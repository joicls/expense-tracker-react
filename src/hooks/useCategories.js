import { useState, useCallback, useMemo } from "react";
import { CATEGORY_STORAGE_KEY, kategoriAwal, warnaKategori, kelasKategori } from "../constants/index.js";
import { buatIdKategori, ambilKelasWarna } from "../utils/helpers.js";
import { useLocalStorage } from "./useLocalStorage.js";

export function useCategories() {
  const [categories, setCategories] = useLocalStorage(CATEGORY_STORAGE_KEY, kategoriAwal);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryDraft, setCategoryDraft] = useState(null);

  const kategoriMap = useMemo(
    () => new Map(categories.map((kategori) => [kategori.id, kategori])),
    [categories]
  );

  const addCategory = useCallback((nama, budget, warna) => {
    const index = categories.length;
    const kelasWarna = ambilKelasWarna(warna);
    const kategoriBaru = {
      id: buatIdKategori(nama),
      nama,
      budget: Math.max(0, budget || 0),
      warna: warna || warnaKategori[index % warnaKategori.length],
      kelas: kelasWarna || kelasKategori[index % kelasKategori.length],
      ikon: "umum",
      bawaan: false
    };

    setCategories((prev) => [...prev, kategoriBaru]);
    return kategoriBaru.id;
  }, [categories, setCategories]);

  const updateCategory = useCallback((id, updates) => {
    setCategories((prev) =>
      prev.map((kategori) =>
        kategori.id === id
          ? { 
              ...kategori, 
              ...updates, 
              kelas: updates.warna ? ambilKelasWarna(updates.warna) : kategori.kelas 
            }
          : kategori
      )
    );
  }, [setCategories]);

  const deleteCategory = useCallback((id, checkTransactions) => {
    const masihDipakai = checkTransactions(id);
    if (masihDipakai) {
      return { success: false, error: "Kategori tidak bisa dihapus karena masih dipakai transaksi." };
    }

    setCategories((prev) => prev.filter((kategori) => kategori.id !== id));
    return { success: true };
  }, [setCategories]);

  const startEditCategory = useCallback((kategori) => {
    setEditingCategoryId(kategori.id);
    setCategoryDraft({
      nama: kategori.nama,
      budget: String(kategori.budget),
      warna: kategori.warna
    });
  }, []);

  const saveEditCategory = useCallback((id) => {
    if (!categoryDraft) return { success: false, error: "Tidak ada data yang diedit" };

    const nama = categoryDraft.nama.trim();
    const budget = Math.max(0, Number(categoryDraft.budget) || 0);
    const warna = categoryDraft.warna || warnaKategori[0];

    if (!nama) {
      return { success: false, error: "Nama kategori tidak boleh kosong." };
    }

    const isDuplicate = categories.some(
      (kategori) => kategori.id !== id && kategori.nama.toLowerCase() === nama.toLowerCase()
    );

    if (isDuplicate) {
      return { success: false, error: "Nama kategori tersebut sudah dipakai." };
    }

    updateCategory(id, { nama, budget, warna });
    setEditingCategoryId(null);
    setCategoryDraft(null);
    return { success: true };
  }, [categoryDraft, categories, updateCategory]);

  const cancelEditCategory = useCallback(() => {
    setEditingCategoryId(null);
    setCategoryDraft(null);
  }, []);

  const getFirstCategoryId = useCallback(() => {
    return categories[0]?.id ?? "makanan";
  }, [categories]);

  return {
    categories,
    kategoriMap,
    addCategory,
    updateCategory,
    deleteCategory,
    editingCategoryId,
    categoryDraft,
    setCategoryDraft,
    startEditCategory,
    saveEditCategory,
    cancelEditCategory,
    getFirstCategoryId
  };
}
