import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import { useToast } from '../context/ToastContext';
import { Trash2, CheckCircle, Plus, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export const DashboardPage = () => {
    const [page, setPage] = useState(1);
    const [newTodo, setNewTodo] = useState('');
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const { data, isLoading } = useQuery({
        queryKey: ['todos', page],
        queryFn: async () => {
            const res = await api.get(`/todos?page=${page}&limit=5`);
            return res.data;
        },
    });

    const createMutation = useMutation({
        mutationFn: (title: string) => api.post('/todos', { title }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            setNewTodo('');
            showToast('Todo added successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.response?.data?.message || 'Failed to add todo', 'error');
        }
    });

    const toggleMutation = useMutation({
        mutationFn: ({ id, isCompleted }: { id: string; isCompleted: boolean }) =>
            api.patch(`/todos/${id}`, { isCompleted: !isCompleted }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
        onError: (err: any) => {
            showToast(err.response?.data?.message || 'Update failed', 'error');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/todos/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            showToast('Todo deleted', 'info');
        },
        onError: (err: any) => {
            showToast(err.response?.data?.message || 'Delete failed', 'error');
        }
    });

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500 font-medium">Loading your space...</div>;

    const todos = data?.data;

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-slide-up">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Your Tasks</h1>
                    <p className="text-gray-500 font-medium mt-1">Organize your day, achieve your goals.</p>
                </div>
            </header>

            <section className="glass-card rounded-[2.5rem] p-8 sm:p-10">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (newTodo.trim()) createMutation.mutate(newTodo);
                    }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <div className="flex-1 relative group">
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            className="input-field pr-12 text-lg h-14 shadow-sm"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-400 transition-colors">
                            <Plus size={24} />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={createMutation.isPending}
                        className="btn-primary h-14 px-8 text-lg flex items-center justify-center gap-2 min-w-[140px]"
                    >
                        {createMutation.isPending ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>Add Task</>
                        )}
                    </button>
                </form>

                <div className="mt-12 space-y-4">
                    {todos?.length === 0 ? (
                        <div className="py-20 text-center space-y-4">
                            <div className="inline-flex p-4 bg-indigo-50 text-indigo-400 rounded-3xl">
                                <CheckCircle size={40} strokeWidth={1.5} />
                            </div>
                            <p className="text-gray-400 font-medium text-lg">All caught up! No tasks found.</p>
                        </div>
                    ) : (
                        todos?.map((todo: any) => (
                            <div
                                key={todo.id}
                                className="group flex items-center justify-between p-5 bg-white border border-gray-100/80 rounded-2xl hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <button
                                        onClick={() => toggleMutation.mutate({ id: todo.id, isCompleted: todo.isCompleted })}
                                        className={`p-1.5 rounded-lg transition-all duration-300 border-2 ${todo.isCompleted
                                                ? "bg-emerald-500 border-emerald-500 text-white"
                                                : "border-gray-200 text-transparent hover:border-indigo-300"
                                            }`}
                                    >
                                        <Check size={16} strokeWidth={3} />
                                    </button>
                                    <span className={`text-lg font-medium transition-all duration-300 ${todo.isCompleted ? "text-gray-300 line-through" : "text-gray-700"
                                        }`}>
                                        {todo.title}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                                    title="Delete task"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <div className="mt-8 flex justify-between items-center bg-white p-4 rounded-[1.5rem] border border-gray-100 shadow-sm">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:text-indigo-600 disabled:opacity-30 transition-colors"
                >
                    <ChevronLeft size={20} /> Previous
                </button>
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Page</span>
                    <span className="text-sm font-bold text-gray-900 px-3 py-1 bg-gray-50 rounded-lg">{page}</span>
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mx-1">of</span>
                    <span className="text-sm font-bold text-gray-900">{Math.ceil(data?.total / 5) || 1}</span>
                </div>
                <button
                    disabled={page >= Math.ceil(data?.total / 5)}
                    onClick={() => setPage((p) => p + 1)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:text-indigo-600 disabled:opacity-30 transition-colors"
                >
                    Next <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};
