import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    const [isNotif, setIsNotif] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title, description, category
        }
        Inertia.post('/news', data)
        setIsNotif(true)
        setTitle('')
        setDescription('')
        setCategory('')

    }
    console.log('props last', props)
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4 flex flex-col gap-2">
                        <input type="text" placeholder="Title" className="input input-bordered w-full"  onChange={(e) => setTitle(e.target.value)} value={title} />
                        <div>{isNotif && props.flash.message}</div>
                        <input type="text" placeholder="descripsi" className="input input-bordered w-full" onChange={(e) => setDescription(e.target.value)} value={description} />
                        <input type="text" placeholder="category" className="input input-bordered w-full" onChange={(e) => setCategory(e.target.value)} value={category} />
                        <button className='btn btn-primary w-fit' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
