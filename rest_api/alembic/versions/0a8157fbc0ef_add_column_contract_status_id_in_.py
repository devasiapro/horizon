"""add column contract status id in customer module table

Revision ID: 0a8157fbc0ef
Revises: 0bdbd232cc22
Create Date: 2023-11-09 16:05:25.873648

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0a8157fbc0ef'
down_revision: Union[str, None] = '0bdbd232cc22'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'customer_module', 
        sa.Column('contract_status_id', sa.Integer(), nullable = False)
    )
    op.create_foreign_key(
        'contract_status_id',
        'customer_module',
        'contract_status',
        ['contract_status_id'],
        ['id']
    )

def downgrade() -> None:
    op.drop_constraint('contract_status_id', 'customer_module', type_='foreignkey')
    op.drop_column('customer_module', 'contract_status_id')
