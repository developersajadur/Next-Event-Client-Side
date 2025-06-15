'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Title from '@/components/shared/Title';
import { getAllPayment } from '@/services/PaymentService';
import { IPayment } from '@/app/types';
import Loader from '@/components/ui/Loader/Loader';
import { IQuery } from '@/services/EventService';

interface Filters {
  searchTerm: string;
  paymentMethod: string;
  paymentStatus: string;
  minAmount: string;
  maxAmount: string;
}

const ManagePaymentsPage = () => {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    paymentMethod: '',
    paymentStatus: '',
    minAmount: '',
    maxAmount: '',
  });

  const totalPages = Math.ceil(total / limit);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchTerm: e.target.value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const query: IQuery & Record<string, any> = { page, limit };

      if (filters.searchTerm.trim()) query.searchTerm = filters.searchTerm.trim();
      if (filters.paymentMethod) query.paymentMethod = filters.paymentMethod;
      if (filters.paymentStatus) query.paymentStatus = filters.paymentStatus;
      if (filters.minAmount) query.minAmount = Number(filters.minAmount);
      if (filters.maxAmount) query.maxAmount = Number(filters.maxAmount);

      const res = await getAllPayment(query);
      setPayments(res?.data?.data || []);
      setTotal(res?.data?.meta?.total || 0);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
      setPayments([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return (
    <div className="px-6 py-6 mb-20">
      <div className="flex items-center justify-between mb-6">
        <Title title="Manage All Payments" />
      </div>

      {/* Search and Filter UI */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by user name or email..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-[200px]"
        />
        <select
          name="paymentMethod"
          value={filters.paymentMethod}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Methods</option>
          <option value="COD">COD</option>
          <option value="Online">Online</option>
        </select>
        <select
          name="paymentStatus"
          value={filters.paymentStatus}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Failed">Failed</option>
        </select>
        <input
          type="number"
          name="minAmount"
          placeholder="Min Amount"
          value={filters.minAmount}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-[120px]"
          min={0}
        />
        <input
          type="number"
          name="maxAmount"
          placeholder="Max Amount"
          value={filters.maxAmount}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-[120px]"
          min={0}
        />
      </div>

      {/* Payment Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader />
        </div>
      ) : payments.length > 0 ? (
        <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-[500px] w-full text-left text-sm table-fixed">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="py-3 px-4 w-[220px]">User</th>
                <th className="py-3 px-4 w-[220px]">User Email</th>
                <th className="py-3 px-4 w-[200px]">Event</th>
                <th className="py-3 px-4 w-[120px]">Amount</th>
                <th className="py-3 px-4 w-[220px]">Transaction ID</th>
                <th className="py-3 px-4 w-[150px]">Method</th>
                <th className="py-3 px-4 w-[150px]">Status</th>
                <th className="py-3 px-4 w-[180px]">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="flex items-center gap-3 px-4 py-4">
                    <div className="relative w-10 h-10">
                      <Image
                        src={payment.user?.image || '/placeholder.svg'}
                        alt={payment.user?.name || 'User'}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <span className="text-gray-800 font-medium">
                      {payment.user?.name || 'Unknown User'}
                    </span>
                  </td>
                  <td className="px-4 py-4 truncate">{payment.user?.email}</td>
                  <td className="px-4 py-4 truncate">{payment.event?.title}</td>
                  <td className="px-4 py-4 truncate">{payment.amount}</td>
                  <td className="px-4 py-4 truncate">{payment.transactionId}</td>
                  <td className="px-4 py-4 truncate">{payment.method}</td>
                  <td className="px-4 py-4 truncate">{payment.status}</td>
                  <td className="px-4 py-4">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-12 text-center text-gray-500">
          <h2 className="text-xl font-medium">No Payments Found</h2>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-4 py-2 border rounded-md transition-all duration-150 ${
              page === idx + 1
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManagePaymentsPage;
