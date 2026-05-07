import { useState, useCallback, useMemo } from "react";
import { TRANSACTION_STORAGE_KEY } from "../constants/index.js";
import { useLocalStorage } from "./useLocalStorage.js";

export function useTransactions(categories, kategoriMap, selectedMonth) {
  const [transactions, setTransactions] = useLocalStorage(TRANSACTION_STORAGE_KEY, []);
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);

  const kategoriFallback = useMemo(() => categories[0]?.id ?? "makanan", [categories]);

  const validateTransaction = useCallback((data) => {
    const errors = [];
    
    if (!data.text || !data.text.trim()) {
      errors.push("Deskripsi tidak boleh kosong.");
    }
    
    if (!Number.isFinite(Number(data.amount)) || Number(data.amount) <= 0) {
      errors.push("Nominal harus lebih dari nol dan tidak boleh negatif.");
    }
    
    if (!data.date) {
      errors.push("Tanggal transaksi wajib dipilih.");
    }
    
    return errors;
  }, []);

  const addTransaction = useCallback((data) => {
    const errors = validateTransaction(data);
    if (errors.length > 0) {
      return { success: false, errors };
    }

    const newTransaction = {
      id: crypto.randomUUID(),
      text: data.text.trim(),
      amount: Number(data.amount),
      type: data.type || "pengeluaran",
      categoryId: data.categoryId || kategoriFallback,
      date: new Date(`${data.date}T12:00:00`).toISOString()
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    return { success: true, transaction: newTransaction };
  }, [validateTransaction, kategoriFallback, setTransactions]);

  const updateTransaction = useCallback((id, data) => {
    const errors = validateTransaction(data);
    if (errors.length > 0) {
      return { success: false, errors };
    }

    setTransactions((prev) =>
      prev.map((transaksi) =>
        transaksi.id === id
          ? {
              ...transaksi,
              text: data.text.trim(),
              amount: Number(data.amount),
              type: data.type,
              categoryId: data.categoryId,
              date: new Date(`${data.date}T12:00:00`).toISOString()
            }
          : transaksi
      )
    );
    return { success: true };
  }, [validateTransaction, setTransactions]);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((transaksi) => transaksi.id !== id));
  }, [setTransactions]);

  const startEditTransaction = useCallback((transaksi) => {
    setEditingId(transaksi.id);
    setEditDraft({
      text: transaksi.text,
      amount: String(transaksi.amount),
      type: transaksi.type,
      categoryId: transaksi.categoryId,
      date: new Date(transaksi.date).toISOString().slice(0, 10)
    });
  }, []);

  const saveEditTransaction = useCallback((id) => {
    if (!editDraft) return { success: false, errors: ["Tidak ada data yang diedit"] };

    const result = updateTransaction(id, editDraft);
    if (result.success) {
      setEditingId(null);
      setEditDraft(null);
    }
    return result;
  }, [editDraft, updateTransaction]);

  const cancelEditTransaction = useCallback(() => {
    setEditingId(null);
    setEditDraft(null);
  }, []);

  const isCategoryUsed = useCallback((categoryId) => {
    return transactions.some((transaksi) => transaksi.categoryId === categoryId);
  }, [transactions]);

  const transaksiBulanan = useMemo(
    () =>
      transactions.filter((transaksi) =>
        new Date(transaksi.date).toISOString().startsWith(selectedMonth)
      ),
    [selectedMonth, transactions]
  );

  const ringkasanBulanan = useMemo(() => {
    const income = transaksiBulanan
      .filter((transaksi) => transaksi.type === "pemasukan")
      .reduce((total, transaksi) => total + Number(transaksi.amount), 0);
    const expense = transaksiBulanan
      .filter((transaksi) => transaksi.type === "pengeluaran")
      .reduce((total, transaksi) => total + Number(transaksi.amount), 0);

    return {
      income,
      expense,
      balance: income - expense,
      count: transaksiBulanan.length,
      expenseCount: transaksiBulanan.filter((transaksi) => transaksi.type === "pengeluaran").length
    };
  }, [transaksiBulanan]);

  const dataGrafik = useMemo(() => {
    const kelompok = transaksiBulanan
      .filter((transaksi) => transaksi.type === "pengeluaran")
      .reduce((hasil, transaksi) => {
        const kategori = kategoriMap.get(transaksi.categoryId) ?? categories[0];
        hasil[kategori.id] = {
          name: kategori.nama,
          value: (hasil[kategori.id]?.value || 0) + Number(transaksi.amount),
          color: kategori.warna
        };
        return hasil;
      }, {});

    return Object.values(kelompok);
  }, [categories, kategoriMap, transaksiBulanan]);

  const kategoriTerbesar = useMemo(() => {
    if (dataGrafik.length === 0) {
      return { name: "Belum ada", value: 0, color: "#64748b" };
    }
    return [...dataGrafik].sort((a, b) => b.value - a.value)[0];
  }, [dataGrafik]);

  const getSortedExpenses = useCallback((sortOrder) => {
    const daftar = transaksiBulanan.filter((transaksi) => transaksi.type === "pengeluaran");

    return [...daftar].sort((a, b) => {
      if (sortOrder === "terlama") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortOrder === "terbesar") {
        return Number(b.amount) - Number(a.amount);
      }
      if (sortOrder === "terkecil") {
        return Number(a.amount) - Number(b.amount);
      }
      if (sortOrder === "kategori") {
        const kategoriA = kategoriMap.get(a.categoryId)?.nama ?? "";
        const kategoriB = kategoriMap.get(b.categoryId)?.nama ?? "";
        return kategoriA.localeCompare(kategoriB, "id");
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [transaksiBulanan, kategoriMap]);

  const getBudgetUsage = useCallback(() => {
    return categories.map((kategori) => {
      const terpakai = transaksiBulanan
        .filter(
          (transaksi) =>
            transaksi.type === "pengeluaran" && transaksi.categoryId === kategori.id
        )
        .reduce((total, transaksi) => total + Number(transaksi.amount), 0);
      const budget = Number(kategori.budget) || 0;
      const persen = budget > 0 ? Math.min(100, Math.round((terpakai / budget) * 100)) : 0;

      return { 
        ...kategori, 
        terpakai, 
        persen, 
        sisa: Math.max(0, budget - terpakai) 
      };
    });
  }, [categories, transaksiBulanan]);

  return {
    transactions,
    transaksiBulanan,
    ringkasanBulanan,
    dataGrafik,
    kategoriTerbesar,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    editingId,
    editDraft,
    setEditDraft,
    startEditTransaction,
    saveEditTransaction,
    cancelEditTransaction,
    isCategoryUsed,
    getSortedExpenses,
    getBudgetUsage,
    transactions
  };
}
