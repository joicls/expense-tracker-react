import { useState, useMemo, useCallback } from "react";
import {
  Header,
  NavigationCards,
  RingkasanView,
  FormTransaksi,
  DaftarPengeluaran,
  AnggaranManager,
  ErrorAlert
} from "./components/index.js";
import { useCategories, useTransactions } from "./hooks/index.js";
import { bulanSaatIni } from "./utils/helpers.js";

export default function App() {
  const [activeView, setActiveView] = useState("ringkasan");
  const [selectedMonth, setSelectedMonth] = useState(() => bulanSaatIni());
  const [expenseSort, setExpenseSort] = useState("terbaru");
  const [error, setError] = useState("");

  const {
    categories,
    kategoriMap,
    addCategory,
    deleteCategory,
    editingCategoryId,
    categoryDraft,
    setCategoryDraft,
    startEditCategory,
    saveEditCategory,
    cancelEditCategory,
    getFirstCategoryId
  } = useCategories();

  const {
    ringkasanBulanan,
    dataGrafik,
    kategoriTerbesar,
    addTransaction,
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
  } = useTransactions(categories, kategoriMap, selectedMonth);

  const penggunaanAnggaran = useMemo(() => getBudgetUsage(), [getBudgetUsage]);
  const totalAnggaran = useMemo(
    () => penggunaanAnggaran.reduce((total, kategori) => total + Number(kategori.budget || 0), 0),
    [penggunaanAnggaran]
  );

  const pengeluaranTerurut = useMemo(
    () => getSortedExpenses(expenseSort),
    [getSortedExpenses, expenseSort]
  );

  const handleAddTransaction = useCallback((data) => {
    const result = addTransaction(data);
    if (result.success) {
      setActiveView("pengeluaran");
      setError("");
    } else {
      setError(result.errors?.[0] || "Terjadi kesalahan");
    }
    return result;
  }, [addTransaction]);

  const handleDeleteCategory = useCallback((id) => {
    const result = deleteCategory(id, isCategoryUsed);
    if (!result.success) {
      setError(result.error);
    } else {
      setError("");
    }
  }, [deleteCategory, isCategoryUsed]);

  const handleSaveEditCategory = useCallback((id) => {
    const result = saveEditCategory(id);
    if (!result.success) {
      setError(result.error);
    } else {
      setError("");
    }
    return result;
  }, [saveEditCategory]);

  const handleSaveEditTransaction = useCallback((id) => {
    const result = saveEditTransaction(id);
    if (!result.success) {
      setError(result.errors?.[0] || "Terjadi kesalahan");
    } else {
      setError("");
    }
    return result;
  }, [saveEditTransaction]);

  const handleAddCategory = useCallback((nama, budget, warna) => {
    const isDuplicate = categories.some(
      (kategori) => kategori.nama.toLowerCase() === nama.toLowerCase()
    );
    if (isDuplicate) {
      setError("Kategori dengan nama tersebut sudah ada.");
      return false;
    }
    addCategory(nama, budget, warna);
    setError("");
    return true;
  }, [addCategory, categories]);

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <Header
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />

        <NavigationCards
          activeView={activeView}
          onViewChange={setActiveView}
          ringkasanBulanan={ringkasanBulanan}
          totalAnggaran={totalAnggaran}
          categoriesCount={categories.length}
        />

        {activeView === "ringkasan" && (
          <RingkasanView
            selectedMonth={selectedMonth}
            ringkasanBulanan={ringkasanBulanan}
            kategoriTerbesar={kategoriTerbesar}
            dataGrafik={dataGrafik}
            onNavigateToExpenses={() => setActiveView("pengeluaran")}
            categories={categories}
            transactions={transactions}
          />
        )}

        {activeView === "pengeluaran" && (
          <section className="grid gap-6">
            <FormTransaksi
              categories={categories}
              onSubmit={handleAddTransaction}
              onError={setError}
              defaultCategoryId={getFirstCategoryId()}
            />
            <DaftarPengeluaran
              pengeluaranTerurut={pengeluaranTerurut}
              kategoriMap={kategoriMap}
              categories={categories}
              expenseSort={expenseSort}
              onSortChange={setExpenseSort}
              editingId={editingId}
              editDraft={editDraft}
              setEditDraft={setEditDraft}
              onStartEdit={startEditTransaction}
              onSaveEdit={handleSaveEditTransaction}
              onDelete={deleteTransaction}
              onCancelEdit={cancelEditTransaction}
              error={error}
            />
          </section>
        )}

        {activeView === "anggaran" && (
          <AnggaranManager
            categories={categories}
            penggunaanAnggaran={penggunaanAnggaran}
            totalAnggaran={totalAnggaran}
            editingCategoryId={editingCategoryId}
            categoryDraft={categoryDraft}
            setCategoryDraft={setCategoryDraft}
            onStartEdit={startEditCategory}
            onSaveEdit={handleSaveEditCategory}
            onDelete={handleDeleteCategory}
            onCancelEdit={cancelEditCategory}
            onAdd={handleAddCategory}
            error={error}
          />
        )}
      </div>
    </main>
  );
}
