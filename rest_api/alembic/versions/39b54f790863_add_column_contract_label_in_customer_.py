"""add column contract label in customer module table

Revision ID: 39b54f790863
Revises: 0a8157fbc0ef
Create Date: 2023-11-10 12:12:49.780139

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '39b54f790863'
down_revision: Union[str, None] = '0a8157fbc0ef'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'customer_module',
        sa.Column(
            'contract_label', 
            sa.String(256), 
            nullable = True
        )
    )


def downgrade() -> None:
    op.drop_column('customer_module', 'contract_label')
