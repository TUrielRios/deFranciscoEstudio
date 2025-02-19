import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee, updateEmployee } from '../../redux/features/empleadoSlice';
import styles from './ListaDeEmpleados.module.css';
import { Edit2, Trash2, Save, X } from 'lucide-react';

const ListaDeEmpleados = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({
    nombre_completo: '',
    cargo: '',
    cedula_a: '',
    cedula_b: '',
    posicion: '',
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (employeeId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      dispatch(deleteEmployee(employeeId));
    }
  };

  const handleEdit = (employeeId) => {
    const employeeToEdit = employees.find((employee) => employee.id === employeeId);
    setEditedData({
      id: employeeToEdit.id,
      nombre_completo: employeeToEdit.nombre_completo,
      cargo: employeeToEdit.cargo,
      cedula_a: employeeToEdit.cedula_a || '',
      cedula_b: employeeToEdit.cedula_b || '',
      posicion: employeeToEdit.posicion || '',
    });
    setEditingId(employeeId);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedData({});
  };

  const handleSaveChanges = async (employeeId) => {
    await dispatch(updateEmployee({ id: employeeId, ...editedData }));
    setEditingId(null);
    setEditedData({});
    dispatch(fetchEmployees());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const sortedEmployees = [...employees].sort((a, b) => a.posicion - b.posicion);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Lista de empleados</h1>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>Hay un total de {employees.length} empleados</span>
          </div>
        </div>
      </div>
      <ul className={styles.employeeList}>
        {sortedEmployees.map((employee) => (
          <li key={employee.id} className={styles.employeeItem}>
            {editingId === employee.id ? (
              <form 
                className={styles.editForm}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveChanges(employee.id);
                }}
              >
                <div className={styles.formGroup}>
                  <label>Nombre Completo:</label>
                  <input
                    type="text"
                    name="nombre_completo"
                    value={editedData.nombre_completo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Cargo:</label>
                  <input
                    type="text"
                    name="cargo"
                    value={editedData.cargo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Cédula A:</label>
                  <input
                    type="text"
                    name="cedula_a"
                    value={editedData.cedula_a}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Cédula B:</label>
                  <input
                    type="text"
                    name="cedula_b"
                    value={editedData.cedula_b}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Posición:</label>
                  <input
                    type="number"
                    name="posicion"
                    value={editedData.posicion}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveButton}>
                    <Save size={16} /> Guardar
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className={styles.cancelButton}
                  >
                    <X size={16} /> Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className={styles.employeeHeader}>
                  <span className={styles.employeePosition}>{employee.posicion}</span>
                  <div className={styles.employeeActions}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEdit(employee.id)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(employee.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className={styles.employeeInfo}>
                  <img className={styles.fotoN} src={employee.foto} alt="" />
                  <div className={styles.employeeDetails}>
                    <h3 className={styles.employeeName}>{employee.nombre_completo}</h3>
                    <p className={styles.employeeCargo}>{employee.cargo}</p>
                    {employee.cedula_a && (
                      <p className={styles.employeeCedula}>Cédula A: {employee.cedula_a}</p>
                    )}
                    {employee.cedula_b && (
                      <p className={styles.employeeCedula}>Cédula B: {employee.cedula_b}</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDeEmpleados;