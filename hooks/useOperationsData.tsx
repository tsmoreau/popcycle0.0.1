import { useState, useEffect } from 'react';
import { Bin, Batch, Order, Blank } from '../lib/schemas';

export const useOperationsData = () => {
  // Data state
  const [bins, setBins] = useState<Bin[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [blanks, setBlanks] = useState<Blank[]>([]);

  // Loading state
  const [loadingBins, setLoadingBins] = useState(true);
  const [loadingBatches, setLoadingBatches] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingBlanks, setLoadingBlanks] = useState(true);

  // Fetch functions
  const fetchBins = async () => {
    try {
      setLoadingBins(true);
      const response = await fetch('/api/operations/bins');
      if (response.ok) {
        const data = await response.json();
        setBins(data);
      } else {
        throw new Error('Failed to fetch bins');
      }
    } catch (error) {
      console.error('Error fetching bins:', error);
      setBins([]);
    } finally {
      setLoadingBins(false);
    }
  };

  const fetchBatches = async () => {
    try {
      setLoadingBatches(true);
      const response = await fetch('/api/operations/batches');
      if (response.ok) {
        const data = await response.json();
        setBatches(data);
      } else {
        throw new Error('Failed to fetch batches');
      }
    } catch (error) {
      console.error('Error fetching batches:', error);
      setBatches([]);
    } finally {
      setLoadingBatches(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const response = await fetch('/api/operations/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchBlanks = async () => {
    try {
      setLoadingBlanks(true);
      const response = await fetch('/api/operations/blanks');
      if (response.ok) {
        const data = await response.json();
        setBlanks(data);
      } else {
        throw new Error('Failed to fetch blanks');
      }
    } catch (error) {
      console.error('Error fetching blanks:', error);
      setBlanks([]);
    } finally {
      setLoadingBlanks(false);
    }
  };

  // CRUD operations
  const handleBinSave = async (bin: Bin) => {
    try {
      const response = await fetch('/api/operations/bins', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bin)
      });
      
      if (response.ok) {
        await fetchBins();
      } else {
        throw new Error('Failed to save bin');
      }
    } catch (error) {
      console.error('Error saving bin:', error);
      throw error;
    }
  };

  const handleBinDelete = async (bin: Bin) => {
    try {
      const response = await fetch(`/api/operations/bins?id=${bin._id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchBins();
      } else {
        throw new Error('Failed to delete bin');
      }
    } catch (error) {
      console.error('Error deleting bin:', error);
      throw error;
    }
  };

  const handleBatchSave = async (batch: Batch) => {
    try {
      const response = await fetch('/api/operations/batches', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(batch)
      });
      
      if (response.ok) {
        await fetchBatches();
      } else {
        throw new Error('Failed to save batch');
      }
    } catch (error) {
      console.error('Error saving batch:', error);
      throw error;
    }
  };

  const handleBatchDelete = async (batch: Batch) => {
    try {
      const response = await fetch(`/api/operations/batches?id=${batch._id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchBatches();
      } else {
        throw new Error('Failed to delete batch');
      }
    } catch (error) {
      console.error('Error deleting batch:', error);
      throw error;
    }
  };

  const handleOrderSave = async (order: Order) => {
    try {
      const response = await fetch('/api/operations/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      
      if (response.ok) {
        await fetchOrders();
      } else {
        throw new Error('Failed to save order');
      }
    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  };

  const handleOrderDelete = async (order: Order) => {
    try {
      const response = await fetch(`/api/operations/orders?id=${order._id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchOrders();
      } else {
        throw new Error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  };

  const handleBlankSave = async (blank: Blank) => {
    try {
      const response = await fetch('/api/operations/blanks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blank)
      });
      
      if (response.ok) {
        await fetchBlanks();
      } else {
        throw new Error('Failed to save blank');
      }
    } catch (error) {
      console.error('Error saving blank:', error);
      throw error;
    }
  };

  const handleBlankDelete = async (blank: Blank) => {
    try {
      const response = await fetch(`/api/operations/blanks?id=${blank._id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchBlanks();
      } else {
        throw new Error('Failed to delete blank');
      }
    } catch (error) {
      console.error('Error deleting blank:', error);
      throw error;
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchBins();
    fetchBatches();
    fetchOrders();
    fetchBlanks();
  }, []);

  return {
    // Data
    bins,
    batches,
    orders,
    blanks,
    
    // Loading states
    loadingBins,
    loadingBatches,
    loadingOrders,
    loadingBlanks,
    
    // Refetch functions
    fetchBins,
    fetchBatches,
    fetchOrders,
    fetchBlanks,
    
    // CRUD handlers
    handleBinSave,
    handleBinDelete,
    handleBatchSave,
    handleBatchDelete,
    handleOrderSave,
    handleOrderDelete,
    handleBlankSave,
    handleBlankDelete,
  };
};