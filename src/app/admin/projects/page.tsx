import { createAdminClient } from '@/utils/supabase/admin';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage() {
  const supabase = await createAdminClient();
  
  // Fetch all projects, order by created_at descending
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error.message || JSON.stringify(error));
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-heading font-medium text-gray-900 mb-2">Projects Management</h1>
        <p className="text-gray-500 font-body">Add, edit, or remove portfolio projects and choose which to feature.</p>
      </div>

      <ProjectsClient initialProjects={projects || []} />
    </div>
  );
}
