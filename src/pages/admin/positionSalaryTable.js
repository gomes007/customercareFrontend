import positionSalaryService from '@/service/positionSalaryService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PositionSalaryTable() {
  const [positionSalaries, setPositionSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchPositionSalaries() {
      setLoading(true);
      try {
        const data = await positionSalaryService.getPositionSalaries();
        setPositionSalaries(data.items || []);
        console.log("dados back end: ", data.items);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar Position Salaries:", error);
        setError("Erro ao carregar Position Salaries");
        setLoading(false);
      }
    }
    fetchPositionSalaries();
  }, []);

  const handleEdit = (id) => {
    router.push(`/admin/positionSalary?id=${id}`);
  };

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja excluir este registro?")) {
      try {
        await positionSalaryService.deletePositionSalary(id);
        setPositionSalaries(positionSalaries.filter((ps) => ps.id !== id));
      } catch (error) {
        console.error("Erro ao excluir Position Salary:", error);
        alert("Erro ao excluir Position Salary");
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="card-footer">
      <div className="table-title">Position Salaries List</div>
      <table className="table table-striped table-sm align-middle table-bordered">
        <thead>
          <tr>
            <th>Position</th>
            <th>Salary</th>
            <th>Commission</th>
            <th>Role</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {positionSalaries.map((ps) => (
            <tr key={ps.id}>
              <td>{ps.position}</td>
              <td>{ps.salary}</td>
              <td>{ps.commission}</td>
              <td>{ps.roleName}</td>
              <td>
                <button onClick={() => handleEdit(ps.id)}>Editar</button>
                <button onClick={() => handleDelete(ps.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
