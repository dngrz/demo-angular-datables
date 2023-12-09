export const dtOptions = {
    responsive: true,
    pagingType: 'full_numbers',
    aoColumnDefs: [{ bSortable: false, aTargets: [0, 1] }],
    order: [[0, 'none'], [1, 'none']],
    retrieve: true,
    language: {
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: 'No hay registros disponibles',
        info: 'Mostrando _PAGE_ de _PAGES_',
        infoEmpty: 'No hay registros disponibles',
        infoFiltered: '(filtrando de _MAX_ registros totales)',
        search: 'Buscar:',
        paginate: {
            first: 'Primero',
            last: 'Último',
            next: 'Siguiente',
            previous: 'Anterior'
        },
    }
};
